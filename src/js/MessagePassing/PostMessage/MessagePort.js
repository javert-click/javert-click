const MPSemantics  = require('../Common/MPSemantics');
const EventTarget  = require('../../DOM/Events/EventTarget');
const DOMException = require('../../DOM/Common/DOMException');
const ArrayUtils   = require('../../Utils/ArrayUtils');
const MessageEvent = require('../../DOM/Events/MessageEvent');

var MPSem = new MPSemantics.MPSemantics();

// THIS IS TO AVOID CIRCULAR DEPENDENCY BETWEEN NODE AND EVENT TARGET!
const Node              = require('../../DOM/Events/Node');
const ShadowRoot        = require('../../DOM/Events/ShadowRoot');
const DocumentFragment  = require('../../DOM/Events/DocumentFragment');
const MouseEvent        = require('../../DOM/Events/MouseEvent');
const Element           = require('../../DOM/Events/Element');
const Text              = require('../../DOM/Events/Text');
const Window            = require('../../DOM/Events/Window');

EventTarget.initEventTarget(Node, ShadowRoot, DocumentFragment, MouseEvent, Element, Text, Window);

/*
* @id MessagePort
*/
function MessagePort(){
    EventTarget.EventTarget.call(this);
    this.__id                = MPSem.newPort();
    this.__Enabled           = false;
    this.__Detached          = false;
    this.__PrimaryInterface  = 'MessagePort'; //TODO CHECK
    this.__HasBeenShipped    = false;
    MessagePort.prototype.ports.push(this);
}

MessagePort.prototype = Object.create(EventTarget.EventTarget.prototype);

MessagePort.prototype.ports = [];

Object.defineProperty(MessagePort.prototype, 'onmessage', {
    /*
    * @id MessagePortOnMessage
    */
    set: function(f){
        this.__Enabled = true;
        this.addEventListener('message', f);
    }
});

Object.defineProperty(MessagePort.prototype, 'onmessageerror', {
    /*
    * @id MessagePortOnMessageError
    */
    set: function(f){
        this.addEventListener('messageerror', f);
    }
});


/*
* @id MessagePortPostMessage
*/
MessagePort.prototype.postMessage = function(message, options){
    MPSem.beginAtomic();
    // 1. Let targetPort be the port with which this MessagePort is entangled, if any; otherwise let it be null.
    var targetPort = MPSem.getPaired(this.__id);
    console.log('Sending message from port '+this.__id+' to port '+targetPort);
    // 2. Run the message port post message steps providing targetPort, message and options.
    postMessageSteps(this, targetPort, message, options);
    MPSem.endAtomic();
}   

/*
* @id MessagePortStart
*/
MessagePort.prototype.start = function(){
    // 1. Enables this MessagePort object's port message queue, if it is not already enabled.
    this.__Enabled = true;
}

/*
* @id MessagePortClose
*/
MessagePort.prototype.close = function(){
    // 1. Set this MessagePort object's [[Detached]] internal slot value to true.
    this.__Detached = true;
    // 2. If this MessagePort object is entangled, disentangle it.
    MPSem.unpairPort(this.__id);
}

// TODO: I believe these 2 functions are not necessary. The has been shipped flag seems to be used only for scheduling the messages.

/*
* @id MessagePortTransferSteps
*/
MessagePort.prototype.transferSteps = function(value, dataHolder){
    this.__id = -1; //TODO: check if this is the right thing to do
    // 1. Set value's has been shipped flag to true.
    this.__HasBeenShipped = true;
    // 2. Set dataHolder.[[PortMessageQueue]] to value's port message queue.
    // 3. If value is entangled with another port remotePort, then:
        // 3.1. Set remotePort's has been shipped flag to true. TODO: how can we do this?
        // 3.2. Set dataHolder.[[RemotePort]] to remotePort.
    // 4. Otherwise, set dataHolder.[[RemotePort]] to null.
}

/*
* @id MessagePortTransferReceivingSteps
*/
MessagePort.prototype.transferReceivingSteps = function(dataHolder, value){
    // 1. Set value's has been shipped flag to true.
    // 2. Move all the tasks that are to fire message events in dataHolder.[[PortMessageQueue]] to the port message queue of value, 
        // if any, leaving value's port message queue in its initial disabled state, and, if value's relevant global object is a Window, 
        // associating the moved tasks with value's relevant global object's associated Document.
    // 3. If dataHolder.[[RemotePort]] is not null, then entangle dataHolder.[[RemotePort]] and value. 
        // (This will disentangle dataHolder.[[RemotePort]] from the original port that was transferred.)
}

function StructuredSerializeWithTransfer(message){
    // 1. Let memory be an empty map *)
    // 2. For each transferable of transferList: 
      // 2.1 (NOT SUPPORTED) If transferable has neither an [[ArrayBufferData]] internal slot ...
      // 2.2 (NOT SUPPORTED) If transferable has an [[ArrayBufferData]] internal slot and ... 
      // 2.3  If memory[transferable] exists, then throw a "DataCloneError" DOMException. 
      // 2.4 Set memory[transferable] to { [[Type]]: an uninitialized value }.
    // 3. Let serialized be ? StructuredSerializeInternal(value, false, memory).
    var serialiazed = StructuredSerializeInternal(message, false);

    // Note: the StructuredSerializeInternal function is a JSIL function, found in ml/JS2JSIL/MP_runtime/Serialization.jsil
    // Note: we skip the steps related to transfer ports, as we are handling this in the MP semantics.
    return serialiazed;
}

function StructuredDeserializeWithTransfer(serializeWithTransferResult){
    var deserialized = StructuredDeserialize(serializeWithTransferResult);
    return deserialized;
}

/*
* @id postMessageSteps
*/
function postMessageSteps(origPort, targetPort, message, options){
    // 1. Let transfer be options["transfer"].
    var transfer = options ? options['transfer'] : [];
    var transferIds = ArrayUtils.map(transfer, function(p) {return p.__id});
    // 2. If transfer contains this MessagePort, then throw a "DataCloneError" DOMException.
    if(transfer && transferIds.indexOf(origPort.__id) !== -1) throw new DOMException.DOMException(DOMException.DataCloneError);
    // 3. Let doomed be false.
    var doomed = false;
    // 4. If targetPort is not null and transfer contains targetPort, then set doomed to true
    // and optionally report to a developer console that the target port was posted to itself, causing the communication channel to be lost.
    if(targetPort !== -1 && transfer && transferIds.indexOf(targetPort) !== -1){
        doomed = true;
        console.log('Target port was posted to itself which causes the communication channel to be lost.')
    }
    // 5. Let serializeWithTransferResult be StructuredSerializeWithTransfer(message, transfer). Rethrow any exceptions.
    var serializeWithTransferResult = StructuredSerializeWithTransfer(message);
    // 6. If targetPort is null, or if doomed is true, then return.
    if(targetPort === -1 || doomed === true) return;
    // 7. Add a task that runs the following steps to the port message queue of targetPort:
    // Note: This call to 'send' will enable our MessagePassing semantics, which will then  trigger the processMessageSteps function.
    MPSem.send(serializeWithTransferResult, transferIds, origPort.__id, targetPort);
}

var scopeMP = {};

/*
* @JSIL
* @id processMessageSteps
*/
function processMessageSteps(global, serializeWithTransferResult, targetPortId){
    console.log('Executing processMessageSteps, targetPortId: '+targetPortId);
    // 1. Let finalTargetPort be the MessagePort in whose port message queue the task now finds itself.
    var scopeMP = global.__scopeMP;
    console.log('this configuration contains '+scopeMP.MessagePort.prototype.ports.length+' ports with id '+scopeMP.MessagePort.prototype.ports[0].__id);
    var finalTargetPort = scopeMP.ArrayUtils.find(scopeMP.MessagePort.prototype.ports, function(p){return p.__id === targetPortId});
    //var finalTargetPort = global.__scopeMP.MessagePort.prototype.ports[targetPortId]; // TODO: check whether or not this is feasible 
    console.log('finalTargetPort: '+finalTargetPort);
    // 2. Let targetRealm be finalTargetPort's relevant Realm.
    // TODO: what to do with these realms?
    if(!finalTargetPort.__Enabled) return;

    // 3. Let deserializeRecord be StructuredDeserializeWithTransfer(serializeWithTransferResult, targetRealm).
    var deserializeRecord = scopeMP.StructuredDeserializeWithTransfer(serializeWithTransferResult);
    // 4. Let messageClone be deserializeRecord.[[Deserialized]].
    //var messageClone = deserializeRecord.Deserialized;
    var messageClone = deserializeRecord;
    // 5. Let newPorts be a new frozen array consisting of all MessagePort objects in deserializeRecord.[[TransferredValues]], if any, maintaining their relative order.
    //var newPorts = deserializeRecord.transferredValues;
    //Object.freeze(newPorts);
    // 6. Fire an event named message at finalTargetPort, using MessageEvent, with the data attribute initialized to messageClone and the ports attribute initialized to newPorts.
    var event = new scopeMP.MessageEvent.MessageEvent();
    event.data = messageClone;
    //event.ports = newPorts; // TODO: How to keep ids updated? 
    event.ports = [];
    console.log('Going to dispatch message event');
    finalTargetPort.dispatchEvent(event);
    //global.dispatchEvent(event);
}

scopeMP.MessagePort  = MessagePort;
scopeMP.MessageEvent = MessageEvent;
scopeMP.ArrayUtils   = ArrayUtils;
scopeMP.StructuredDeserializeWithTransfer = StructuredDeserializeWithTransfer;

JSILSetGlobalObjProp("__scopeMP", scopeMP);

exports.MessagePort = MessagePort;
    