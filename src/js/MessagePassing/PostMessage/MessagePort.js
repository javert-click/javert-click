const MPSemantics  = require('../Common/MPSemantics');
const EventTarget  = require('../../DOM/Events/EventTarget');
const DOMException = require('../../DOM/Common/DOMException');
const ArrayUtils   = require('../../Utils/ArrayUtils');
const MessageEvent = require('../../DOM/Events/MessageEvent');
const JS2JSILList  = require('../../Utils/JS2JSILList'); 

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
function MessagePort(id){
    EventTarget.EventTarget.call(this);
    this.__id                = id ? id : MPSem.newPort();
    this.__Enabled           = false;
    this.__Detached          = false;
    this.__PrimaryInterface  = 'MessagePort'; //TODO CHECK
    this.__HasBeenShipped    = false;
    MessagePort.prototype.ports[this.__id] = this;
}

MessagePort.prototype = Object.create(EventTarget.EventTarget.prototype);

MessagePort.prototype.ports = {};

Object.defineProperty(MessagePort.prototype, 'onmessage', {
    /*
    * @id MessagePortOnMessage
    */
    set: function(f){
        console.log('MessagePortOnMessage, this: '+this);
        this.__Enabled = true;
        console.log('MessagePortOnMessage2');
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

// TODOMP: I believe these 2 functions below are not necessary. The has been shipped flag seems to be used only for scheduling the messages.
// We are handling this at the level of the MP-Semantics
/*
* @id MessagePortTransferSteps
*/
function TransferSteps(value, dataHolder){
    // 1. Set value's has been shipped flag to true.
    value.__HasBeenShipped = true;
    // 2. (MP-Semantics) Set dataHolder.[[PortMessageQueue]] to value's port message queue.
    // 3. (MP-Semantics) If value is entangled with another port remotePort, then:
        // 3.1. Set remotePort's has been shipped flag to true. TODO: how can we do this?
        // 3.2. Set dataHolder.[[RemotePort]] to remotePort.
    // 4. Otherwise, set dataHolder.[[RemotePort]] to null.
}

/*
* @id MessagePortTransferReceivingSteps
*/
function TransferReceivingSteps(value){
    // 1. Set value's has been shipped flag to true.
    value.__HasBeenShipped = true;
    // 2. (MP-Semantics) Move all the tasks that are to fire message events in dataHolder.[[PortMessageQueue]] to the port message queue of value, 
        // if any, leaving value's port message queue in its initial disabled state, and, if value's relevant global object is a Window, 
        // associating the moved tasks with value's relevant global object's associated Document.
    // 3. (ALSO NOT NECESSARY) If dataHolder.[[RemotePort]] is not null, then entangle dataHolder.[[RemotePort]] and value. 
        // (This will disentangle dataHolder.[[RemotePort]] from the original port that was transferred.)
}

function StructuredSerializeWithTransfer(message, transfer){
    // 1. Let memory be an empty map *)
    var memory = {};
    // 2. For each transferable of transferList: 
    transfer.map(transferable => {
      // 2.1 (NOT SUPPORTED) If transferable has neither an [[ArrayBufferData]] internal slot ...
      // 2.2 (NOT SUPPORTED) If transferable has an [[ArrayBufferData]] internal slot and ... 
      // 2.3  If memory[transferable] exists, then throw a "DataCloneError" DOMException. 
      if(memory[transferable.__id]) throw new DOMException.DOMException(DOMException.DataCloneError);
      // 2.4 Set memory[transferable] to { [[Type]]: an uninitialized value }.
      memory[transferable.__id] = {'Type': undefined};
    });
    // 3. Let serialized be ? StructuredSerializeInternal(value, false, memory).
    var serialiazed = StructuredSerializeInternal(message, false);
    // 4. Let transferDataHolders be a new empty List.
    // Note: the StructuredSerializeInternal function is a JSIL function, found in ml/JS2JSIL/MP_runtime/Serialization.jsil
    // Note: we skip the steps (4-5) related to transferDataHolders, as we are handling this in the MP semantics.
    return serialiazed;
}

/*
* @id StructuredDeserializeWithTransfer
*/
function StructuredDeserializeWithTransfer(message, transferIds){
    // 1. Let memory be an empty map.
    // This step is performed during StructuredDeserialize (at the JSIL level)
    // 2. Let transferredValues be a new empty List.
    var transferredValues = [];
    // 3. For each transferDataHolder of serializeWithTransferResult.[[TransferDataHolders]]:
    transferIds.map ((transferId) => {
        // 3.1 Let value be an uninitialized value.
        var value;
        // 3.2 (NOT SUPPORTED) If transferDataHolder.[[Type]] is "ArrayBuffer", then set value to a new ArrayBuffer object in ...
        // 3.3 Otherwise:
           // 3.3.1 (NOT SUPPORTED) Let interfaceName be transferDataHolder.[[Type]].
           // 3.3.2 (NOT SUPPORTED) If the interface identified by interfaceName is not exposed in targetRealm, then throw a "DataCloneError" DOMException.
           // 3.3.3 Set value to a new instance of the interface identified by interfaceName, created in targetRealm.
           value = new MessagePort(transferId);
           // 3.3.4 Perform the appropriate transfer-receiving steps for the interface identified by interfaceName given transferDataHolder and value.
           TransferReceivingSteps(value);
           // 3.4 (NOT SUPPORTED) Set memory[transferDataHolder] to value.
        // 3.5 Append value to transferredValues.
        transferredValues.push(value);
    });
    // 4. Let deserialized be ? StructuredDeserialize(serializeWithTransferResult.[[Serialized]], targetRealm, memory).
    var deserialized = StructuredDeserialize(message);
    // 5. Return { [[Deserialized]]: deserialized, [[TransferredValues]]: transferredValues }.
    return { 'Deserialized': deserialized, 'TransferredValues': transferredValues };
}

/*
* @id postMessageSteps
*/
function postMessageSteps(origPort, targetPort, message, options){
    // 1. Let transfer be options["transfer"].
    var transfer = options ? ((options instanceof Array) ? options : options['transfer']) : [];
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
    var serializeWithTransferResult = StructuredSerializeWithTransfer(message, transfer);
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
function processMessageSteps(global, message, targetPortId, transferIds){
    // Initial setup
    var scopeMP = global.__scopeMP;
    transferIds = scopeMP.JS2JSILList.JSILListToArray(transferIds);
    console.log('Executing processMessageSteps, targetPortId: '+targetPortId+', transferIds: '+transferIds);
    // 1. Let finalTargetPort be the MessagePort in whose port message queue the task now finds itself.
    var finalTargetPort = scopeMP.MessagePort.prototype.ports[targetPortId];
    // 2. (NOT SUPPORTED) Let targetRealm be finalTargetPort's relevant Realm.
    // As we model the message queue via MP Semantics, we add this step here to make sure the target port is enabled
    if(!finalTargetPort.__Enabled) return;
    // 3. Let deserializeRecord be StructuredDeserializeWithTransfer(serializeWithTransferResult, targetRealm).
    var deserializeRecord = scopeMP.StructuredDeserializeWithTransfer(message, transferIds);
    // 4. Let messageClone be deserializeRecord.[[Deserialized]].
    //var messageClone = deserializeRecord.Deserialized;
    var messageClone = deserializeRecord.Deserialized;
    console.log('MESSAGE DESERIALIZED: '+messageClone);
    // 5. Let newPorts be a new frozen array consisting of all MessagePort objects in deserializeRecord.[[TransferredValues]], if any, maintaining their relative order.
    // TODOMP: WHAT IS A FROZEN ARRAY??? SHOULD THE OBJECTS BE FROZEN?
    //var newPorts = deserializeRecord.TransferredValues.map(p => { return Object.freeze(p) });
    var newPorts = deserializeRecord.TransferredValues;
    // 6. Fire an event named message at finalTargetPort, using MessageEvent, with the data attribute initialized to messageClone and the ports attribute initialized to newPorts.
    var event = new scopeMP.MessageEvent.MessageEvent();
    event.data = messageClone; 
    event.ports = newPorts;
    console.log('Going to dispatch message event');
    finalTargetPort.dispatchEvent(event);
}

scopeMP.MessagePort  = MessagePort;
scopeMP.MessageEvent = MessageEvent;
scopeMP.ArrayUtils   = ArrayUtils;
scopeMP.JS2JSILList  = JS2JSILList;
scopeMP.StructuredDeserializeWithTransfer = StructuredDeserializeWithTransfer;

JSILSetGlobalObjProp("__scopeMP", scopeMP);

exports.MessagePort = MessagePort;
    