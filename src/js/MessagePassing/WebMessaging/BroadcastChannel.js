const EventTarget       = require('../../DOM/Events/EventTarget');
const MPSemantics       = require('../Common/MPSemantics');
const ESemantics        = require('../../DOM/Events/EventsSemantics');
const Serialization     = require('./MessageSerialization');
const DOMException      = require('../../DOM/Common/DOMException');
const MessageEvent      = require('../../DOM/Events/MessageEvent');
const location          = require('../WebMessaging/Location'); 

const Node              = require('../../DOM/Events/Node');
const ShadowRoot        = require('../../DOM/Events/ShadowRoot');
const DocumentFragment  = require('../../DOM/Events/DocumentFragment');
const MouseEvent        = require('../../DOM/Events/MouseEvent');
const Element           = require('../../DOM/Events/Element');
const Text              = require('../../DOM/Events/Text');
const WindowInfo        = require('../../DOM/Events/Window');
const Event             = require('../../DOM/Events/Event');
const ErrorEvent        = require('../../DOM/Events/ErrEvent');

EventTarget.initEventTarget(Node, ShadowRoot, DocumentFragment, MouseEvent, Element, Text, WindowInfo, Event, ErrorEvent);


var MPSem = MPSemantics.getMPSemanticsInstance();
var ESem  = new ESemantics.EventsSemantics();

/*
* @id BroadcastChannel
*/
function BroadcastChannel(name){
    if(arguments.length === 0) throw new TypeError("Failed to create BroadcastChannel: 1 argument required, but only 0 present.")
    EventTarget.EventTarget.call(this);
    this.name = String(name);
    this.__id = MPSem.newPort();
    this.closed = false;
    this.__onmessage = null;
    BroadcastChannel.prototype.channels.push(this);
    // Adds handler so that async message is processed correctly
    ESem.addHandler("Message", "ProcessMessageBroadcast", "broadcastChannelProcessMessage");
    ESem.addHandler("General", "ProcessSyncMessageBroadcast", "processSyncMessage");
    var newbc_msg = { id: this.__id, name: this.name };
    var datacloneerr = new DOMException.DOMException(DOMException.DATA_CLONE_ERR);
    var serialized = StructuredSerializeInternal(newbc_msg, false, datacloneerr);
    MPSem.notifyAll(serialized, this.__id, "ProcessSyncMessageBroadcast");
}

BroadcastChannel.prototype = Object.create(EventTarget.EventTarget.prototype);

Object.defineProperty(BroadcastChannel.prototype, 'onmessage', {
    set: function(f){
        this.__onmessage = f;
        if(this.__onmessage) this.removeEventListener('message', this.__onmessage);
        this.addEventListener('message', f);
    },
    get: function(){
        return this.__onmessage;
    }
});

var window = WindowInfo.getInstance();

Object.defineProperty(window, 'BroadcastChannel', {
    get: function(){
        return BroadcastChannel;
    }
});

BroadcastChannel.prototype.channels = [];

/*
* @id BroadcastChannelClose
*/
BroadcastChannel.prototype.close = function(){
    this.closed = true;
}

/*
* @id BroadcastChannelPostMessage
*/
BroadcastChannel.prototype.postMessage = function(message){
  if(arguments.length === 0) throw new TypeError("Failed to execute 'postMessage' on 'BroadcastChannel': 1 argument required, but only 0 present.")
  // 1. If this's closed flag is true, then throw an "InvalidStateError" DOMException.
  if(this.closed) throw new DOMException.DOMException(DOMException.INVALID_STATE_ERR);
  // 2. Let serialized be StructuredSerialize(message)
  var datacloneerr = new DOMException.DOMException(DOMException.DATA_CLONE_ERR);
  var serialized = StructuredSerializeInternal(message, false, datacloneerr);
  // 3. Let sourceOrigin be this's relevant settings object's origin.
  // 4. (MPSem!) Let destinations be a list of BroadcastChannel objects that match the following criteria
  var destinations = MPSem.getAllPairedPorts(this.__id);
  console.log('got '+destinations.length+' paired ports with '+this.__id);
  var orig_id = this.__id;
  // 5. Remove source from destinations.
  // 6. Sort destinations such that all BroadcastChannel objects whose relevant agents are the same are sorted in creation order, oldest first
  // 7. For each destination in destinations, queue a global task on the DOM manipulation task source given destination's relevant global object to perform the following steps
  destinations.forEach((d) => { console.log('Sending message from bc '+orig_id+'to '+d); MPSem.send([serialized, d],[], orig_id, d, "ProcessMessageBroadcast");})
}

/*
 * @JSIL
 * @id broadcastChannelProcessMessage 
 */
function broadcastChannelProcessMessage(global, serialized, targetPort){
   var xsc = global.__scopeBC;
   console.log('broadcastChannelProcessMessage, targetPortId: '+targetPort);
   var destination = xsc.BroadcastChannel.prototype.channels.find((c) => {return c.__id === targetPort});
   console.log('Found destination? '+destination);
   console.log('Destination closed? '+destination.closed);
   // 1. If destination's closed flag is true, then abort these steps.
   if (destination.closed === true) return;
   // 2. (NOT SUPPORTED) Let targetRealm be destination's relevant Realm.
   // 3. Let data be StructuredDeserialize(serialized, targetRealm).
   var data = StructuredDeserialize(serialized);
   console.log('Msg deserialised: '+data);
   // If this throws an exception, catch it, fire an event named messageerror at destination, using MessageEvent, with the origin attribute initialized to the serialization of sourceOrigin, and then abort these steps.
   // 4. Fire an event named message at destination, using MessageEvent, with the data attribute initialized to data and the origin attribute initialized to the serialization of sourceOrigin.
   var event    = new xsc.MessageEvent.MessageEvent();
   event.data   = data;
   event.source = null;
   event.origin = xsc.location.origin;
   destination.dispatchEvent(event, undefined, true);
}

/* 
 * @JSIL 
 * @id processSyncMessage
 */
function processSyncMessage(global, serialized){
    var xsc = global.__scopeBC;
    var msg = StructuredDeserialize(serialized);
    var existingChannels = xsc.BroadcastChannel.prototype.channels;
    existingChannels.map((c) => {
       if(c.name === msg.name && c.__id !== msg.id){
         xsc.MPSem.pairPorts(c.__id, msg.id);
       }
    });
}

var xsc = {};

xsc.BroadcastChannel = BroadcastChannel;
xsc.Serialization    = Serialization;
xsc.MessageEvent     = MessageEvent;
xsc.location         = location;
xsc.MPSem            = MPSem;

JSILSetGlobalObjProp("__scopeBC", xsc);

exports.BroadcastChannel = BroadcastChannel;