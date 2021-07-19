const EventTarget = require('../../DOM/Events/EventTarget');
const MessagePort = require('../PostMessage/MessagePort');
const MPSemantics = require('../Common/MPSemantics');

var MPSem = MPSemantics.getMPSemanticsInstance();

/*
* @id SharedWorker
*/
function SharedWorker(scriptURL, options){
    EventTarget.EventTarget.call(this);
    //1. (NOT SUPPORTED) Optionally, throw a "SecurityError" DOMException if the request violates a policy decision 
     //(e.g. if the user agent is configured to not allow the page to start shared workers).
    //2. If options is a DOMString, set options to a new WorkerOptions dictionary whose name member is set to the value of options and whose other members are set to their default values.
    if(typeof(options) === 'string') options = {name: options};
    //3. (NOT SUPPORTED) Let outside settings be the current settings object.
    //4. (NOT SUPPORTED) Parse scriptURL relative to outside settings.
    //5. (NOT SUPPORTED) If this fails, throw a "SyntaxError" DOMException.
    //6. Otherwise, let urlRecord be the resulting URL record.
    var urlRecord = scriptURL;
    //7. Let worker be a new SharedWorker object.
    var worker = this;
    //8. Let outside port be a new MessagePort in outside settings's Realm.
    var outsidePort = new MessagePort.PublicMessagePort();
    //9. Assign outside port to the port attribute of worker.
    worker.__port = outsidePort;
    //10. (NOT SUPPORTED) Let callerIsSecureContext be true if outside settings is a secure context; otherwise, false.
    //11. Enqueue the following steps to the shared worker manager:
    worker.__id = MPSem.create(urlRecord, "__setupConf", [urlRecord, outsidePort.__id, true]);
    //12. Return worker.
    return worker;
}

SharedWorker.prototype = Object.create(EventTarget.EventTarget.prototype);

Object.defineProperty(SharedWorker.prototype, 'onmessage', {
    /*
    * @id SharedWorkerOnMessage
    */
    set: function(f){
        this.__port.__Enabled = true;
        this.__port.addEventListener('message', f);
    }
});

Object.defineProperty(SharedWorker.prototype, 'onmessageerror', {
    /*
    * @id SharedWorkerOnMessageError
    */
    set: function(f){
        this.__port.addEventListener('messageerror', f);
    }
});

Object.defineProperty(SharedWorker.prototype, 'port', {
    /*
    * @id SharedWorkerPort
    */
    set: function(f){
        throw new Error('SharedWorker port is readonly')
    },
    get: function(){
        return this.__port;
    }
});

exports.SharedWorker = SharedWorker;