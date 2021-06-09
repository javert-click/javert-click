const MPSemantics  = require('../Common/MPSemantics');
const EventTarget  = require('../../DOM/Events/EventTarget');
const DOMException = require('../../DOM/Common/DOMException');
const MessageEvent = require('../../DOM/Events/MessageEvent');
const JS2JSILList  = require('../../Utils/JS2JSILList'); 
const ArrayUtils   = require('../../Utils/ArrayUtils'); 

var MPSem = MPSemantics.getMPSemanticsInstance();

// THIS IS TO AVOID CIRCULAR DEPENDENCY BETWEEN NODE AND EVENT TARGET!
const Node              = require('../../DOM/Events/Node');
const ShadowRoot        = require('../../DOM/Events/ShadowRoot');
const DocumentFragment  = require('../../DOM/Events/DocumentFragment');
const MouseEvent        = require('../../DOM/Events/MouseEvent');
const Element           = require('../../DOM/Events/Element');
const Text              = require('../../DOM/Events/Text');
const WindowInfo        = require('../../DOM/Events/Window');
const Serialization     = require('./MessageSerialization');

EventTarget.initEventTarget(Node, ShadowRoot, DocumentFragment, MouseEvent, Element, Text, WindowInfo);

/*
* MessagePort constructor should not be accessible
*/
function MessagePort(){
    throw new TypeError("Illegal constructor");
}

/*
* @id MessagePort
*/
function PublicMessagePort(id){
    EventTarget.EventTarget.call(this);
    this.__id                = id ? id : MPSem.newPort();
    this.__Enabled           = false;
    this.__Detached          = false;
    this.__PrimaryInterface  = 'MessagePort'; //TODO CHECK
    this.__HasBeenShipped    = false;
    MessagePort.prototype.ports.push(this);
}

MessagePort.prototype = Object.create(EventTarget.EventTarget.prototype);

MessagePort.prototype.ports = [];

PublicMessagePort.prototype = MessagePort.prototype;

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
    postMessageSteps(this, targetPort, false, message, options);
    MPSem.endAtomic();
}  

/*
* @id MessagePortPostWindow
*/
MessagePort.prototype.postMessageWindow = function(message, targetOrigin, transfer){
    //For the moment let's ignore targetOrigin
    MPSem.beginAtomic();
    // 1. Let targetPort be the port with which this MessagePort is entangled, if any; otherwise let it be null.
    var targetPort = MPSem.getPaired(this.__id);
    console.log('Sending message from port '+this.__id+' to port '+targetPort);
    // 2. Run the message port post message steps providing targetPort, message and options.
    postMessageSteps(this, targetPort, true, message, transfer);
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

/*
* @id postMessageSteps
*/
function postMessageSteps(origPort, targetPort, isWindow, message, options){
    // 1. Let transfer be options["transfer"].
    var transfer = options ? ((options instanceof Array) ? options : options['transfer']) : [];
    var transferIds = transfer.map(function(p) {return p.__id});
    // 2. If transfer contains this MessagePort, then throw a "DataCloneError" DOMException.
    if(transfer && transferIds.indexOf(origPort.__id) !== -1) throw new DOMException.DOMException(DOMException.DataCloneError);
    // 3. Let doomed be false.
    var doomed = false;
    // 4. If targetPort is not null and transfer contains targetPort, then set doomed to true
    // and optionally report to a developer console that the target port was posted to itself, causing the communication channel to be lost.
    if(targetPort !== null && transfer && transferIds.indexOf(targetPort) !== -1){
        doomed = true;
        console.log('Target port was posted to itself which causes the communication channel to be lost.')
    }
    // 5. Let serializeWithTransferResult be StructuredSerializeWithTransfer(message, transfer). Rethrow any exceptions.
    var serializeWithTransferResult = Serialization.StructuredSerializeWithTransfer(message, transfer);
    // 6. If targetPort is null, or if doomed is true, then return.
    if(targetPort === null || doomed === true) return;
    // 7. Add a task that runs the following steps to the port message queue of targetPort:
    // Note: This call to 'send' will enable our MessagePassing semantics, which will then  trigger the processMessageSteps function.
    MPSem.send(serializeWithTransferResult, transferIds, origPort.__id, targetPort, isWindow);
}

var scopeMP = {};

/*
* @JSIL
* @id processMessageSteps
*/
function processMessageSteps(global, message, targetPortId, isWindow, transferIds){
    // Initial setup
    var scopeMP = global.__scopeMP;
    transferIds = scopeMP.JS2JSILList.JSILListToArray(transferIds);
    // 1. Let finalTargetPort be the MessagePort in whose port message queue the task now finds itself.
    var finalTargetPort = scopeMP.ArrayUtils.find(scopeMP.MessagePort.prototype.ports, function(p){return p.__id === targetPortId});
    // 2. (NOT SUPPORTED) Let targetRealm be finalTargetPort's relevant Realm.
    // As we model the message queue via MP Semantics, we add this step here to make sure the target port is enabled
    //console.log('Found target port: '+finalTargetPort.__Enabled);
    if(!finalTargetPort || !finalTargetPort.__Enabled) return;
    // 3. Let deserializeRecord be StructuredDeserializeWithTransfer(serializeWithTransferResult, targetRealm).
    var deserializeRecord = scopeMP.Serialization.StructuredDeserializeWithTransfer(message, transferIds, scopeMP.MessagePort);
    // 4. Let messageClone be deserializeRecord.[[Deserialized]].
    var messageClone = deserializeRecord.Deserialized;
    //console.log('Message: '+messageClone);
    // 5. Let newPorts be a new frozen array consisting of all MessagePort objects in deserializeRecord.[[TransferredValues]], if any, maintaining their relative order.
    // TODOMP: WHAT IS A FROZEN ARRAY??? SHOULD THE OBJECTS BE FROZEN?
    //var newPorts = deserializeRecord.TransferredValues.map(p => { return Object.freeze(p) });
    var newPorts = deserializeRecord.TransferredValues;
    newPorts.forEach(np => {
        scopeMP.MessagePort.prototype.ports = scopeMP.MessagePort.prototype.ports.filter(p => {return p.__id !== np.__id});
        scopeMP.MessagePort.prototype.ports.push(np);
    });
    // 6. Fire an event named message at finalTargetPort, using MessageEvent, with the data attribute initialized to messageClone and the ports attribute initialized to newPorts.
    var event = new scopeMP.MessageEvent.MessageEvent();
    event.data = messageClone; 
    event.ports = newPorts;
    //console.log('Going to dispatch event, isWindow: '+isWindow);
    //console.log('finalTargetPort.targetWindow: '+finalTargetPort.targetWindow);
    if(isWindow && finalTargetPort.targetWindow) finalTargetPort.targetWindow.dispatchEvent(event);
    else finalTargetPort.dispatchEvent(event);
}

//TODOMP: think of a better solution for this. 

var Window = WindowInfo.Window;

Object.defineProperty(Window.prototype, 'onmessage', {
    /*
    * @id WindowOnMessage
    */
    set: function(f){
        this.addEventListener('message', f);
    }
});

/*
* @id WindowPostMessageWithOptions
*/
Window.prototype.postMessage = function(message, options, transfer){
    // 1. Let targetWindow be this Window object.
    var targetWindow = this;
    // check which version of postMessage is called:
    // postMessage(message [, options ]) or postMessage(message, targetOrigin [, transfer ])
    if (options === undefined || (options['targetOrigin'] === undefined && transfer !== undefined)) {
        options = { 'targetOrigin': options, 'transfer': transfer };
    }
    // 2. Run the window post message steps providing targetWindow, message, and options.
    windowPostMessageSteps(targetWindow, message, options);
}

/*
* @id WindowPostMessageSteps
*/ 
function windowPostMessageSteps(targetWindow, message, options){
    // 1. (NOT SUPPORTED) Let targetRealm be targetWindow's Realm.
    // 2. (NOT SUPPORTED) Let incumbentSettings be the incumbent settings object.
    // 3. Let targetOrigin be options["targetOrigin"].
    var targetOrigin = options['targetOrigin'];
    // 4. TODOMP: If targetOrigin is a single U+002F SOLIDUS character (/), then set targetOrigin to incumbentSettings's origin.
    // 5. TODOMP: Otherwise, if targetOrigin is not a single U+002A ASTERISK character (*), then:
    // 6. Let transfer be options["transfer"].
    var transfer = (options['transfer'] !== undefined) ? options['transfer'] : [];
    var transferIds = transfer.map(function(p) {return p.__id});
    // 7. Let serializeWithTransferResult be StructuredSerializeWithTransfer(message, transfer). Rethrow any exceptions.
    var serializeWithTransferResult = Serialization.StructuredSerializeWithTransfer(message, transfer);
    // 8. Queue a global task on the posted message task source given targetWindow to run the following steps:
    __ES__wrapper__schedule("windowProcessMessageSteps", scopeMP, serializeWithTransferResult, transferIds, targetWindow);
}

/*
* @JSIL
* @id windowProcessMessageSteps
*/
function windowProcessMessageSteps(scopeMP, serializeWithTransferResult, transferIds, targetWindow){
    //transferIds = scopeMP.JS2JSILList.JSILListToArray(transferIds);
    // 8.1 If the targetOrigin argument is not a single literal U+002A ASTERISK character (*) and targetWindow's associated Document's origin is not same origin with targetOrigin, then return.
    // 8.2 Let origin be the serialization of incumbentSettings's origin.
    // 8.3 Let source be the WindowProxy object corresponding to incumbentSettings's global object (a Window object).
    // 8.4 Let deserializeRecord be StructuredDeserializeWithTransfer(serializeWithTransferResult, targetRealm).
    var deserializeRecord = scopeMP.Serialization.StructuredDeserializeWithTransfer(serializeWithTransferResult, transferIds, scopeMP.MessagePort);
    // 8.5 Let messageClone be deserializeRecord.[[Deserialized]].
    var messageClone = deserializeRecord.Deserialized;
    // 8.6 Let newPorts be a new frozen array consisting of all MessagePort objects in deserializeRecord.[[TransferredValues]], if any, maintaining their relative order.
    var newPorts = deserializeRecord.TransferredValues;
    // 8.7 Fire an event named message at targetWindow, using MessageEvent, 
     // with the origin attribute initialized to origin, the source attribute initialized to source, 
     // the data attribute initialized to messageClone, and the ports attribute initialized to newPorts.
    var event = new scopeMP.MessageEvent.MessageEvent();
    event.data = messageClone; 
    event.ports = newPorts;
    console.log('Going to dispatch message event');
    targetWindow.dispatchEvent(event);
}

scopeMP.MessagePort  = PublicMessagePort;
scopeMP.MessageEvent = MessageEvent;
scopeMP.JS2JSILList  = JS2JSILList;
scopeMP.ArrayUtils   = ArrayUtils;
scopeMP.Serialization = Serialization;

JSILSetGlobalObjProp("__scopeMP", scopeMP);

exports.MessagePort = MessagePort;
exports.PublicMessagePort = PublicMessagePort;
    