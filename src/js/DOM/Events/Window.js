/********************/
/* INTERFACE WINDOW */
/********************/

const EventTarget = require('./EventTarget');
const Serialization = require('../../MessagePassing/PostMessage/MessageSerialization');

/*
* @id Window
*/
var Window = function(){
    EventTarget.EventTarget.call(this);
    this.document = null;
    this.timeStamp = (new Date()).getTime();
    this.event = undefined;
    this.__onerror = null;
    this.window = this;
    this.parent = null;
    this.opener = null;

    this.outerHeight = 820;
};

Window.prototype = Object.create(EventTarget.EventTarget.prototype);

Object.defineProperty(Window.prototype, 'onerror', {
    /*
    * @id WindowOnErrorSet
    */
    set: function(f){
        this.addEventListener("error", f);
        this.__onerror = f;
    },

    /*
    * @id WindowOnErrorGet
    */
    get: function(){
        return this.__onerror;
    }
});

/*
* @id WindowGetComputedStyle
*/
Window.prototype.getComputedStyle = function(elem){
    return elem.style;
};

Object.defineProperty(Window.prototype, 'outer-height', {
    get: function(){
        return this.outerHeight;
    }
});

Window.prototype.setTimeout = function (callback, timeout) {
    return callback ();
}

Window.prototype.clone = function () {
    var copy = new DOM.Window.Window();
    copy.document = this.document;
    copy.timeStamp = this.timeStamp;
    copy.__onerror = this.__onerror;
    copy.paent = this.parent;
    copy.opener = this.opener;
    copy.outerHeight = this.outerHeight;
    return copy;
}

/*
* @id WindowPostMessage
*/
Window.prototype.postMessage = function(message, targetOrigin, transfer){
    // 1. Let targetWindow be this Window object.
    var targetWindow = this;
    // 2. Let options be «[ "targetOrigin" → targetOrigin, "transfer" → transfer ]».
    var options = { 'targetOrigin': targetOrigin, 'transfer': transfer };
    // 3. Run the window post message steps providing targetWindow, message, and options.
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
    var transfer = options['transfer'];
    var transferIds = transfer.map(function(p) {return p.__id});
    // 7. Let serializeWithTransferResult be StructuredSerializeWithTransfer(message, transfer). Rethrow any exceptions.
    var serializeWithTransferResult = Serialization.StructuredSerializeWithTransfer(message, transfer);
    // 8. Queue a global task on the posted message task source given targetWindow to run the following steps:
    //MPSem.send(serializeWithTransferResult, transferIds, origPort.__id, targetPort);

}

var windowInstance;

function getInstance(){
    if (!windowInstance){
        windowInstance = new Window();
    }
    return windowInstance;
}

exports.Window = Window;
exports.getInstance = getInstance;
