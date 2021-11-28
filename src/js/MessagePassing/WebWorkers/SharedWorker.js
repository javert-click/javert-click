const EventTarget  = require('../../DOM/Events/EventTarget');
const MessagePort  = require('../PostMessage/MessagePort');
const MPSemantics  = require('../Common/MPSemantics');
const DOMException = require('../../DOM/Common/DOMException');
const URL          = require('../PostMessage/URL');

var MPSem = MPSemantics.getMPSemanticsInstance();

/*
* @id SharedWorker
*/
function SharedWorker(scriptURL, options){
    SharedWorker.prototype.creating = true;
    //debugger;
    if(arguments.length === 0) throw new TypeError("TypeError in SharedWorker. 1 argument required, 0 provided.");
    EventTarget.EventTarget.call(this);
    if(options && (options.type === '' ||  options.type === 'unknown')) throw new TypeError("Invalid type for worker");
    //1. (NOT SUPPORTED) Optionally, throw a "SecurityError" DOMException if the request violates a policy decision 
     //(e.g. if the user agent is configured to not allow the page to start shared workers).
    //2. If options is a DOMString, set options to a new WorkerOptions dictionary whose name member is set to the value of options and whose other members are set to their default values.
    if(!options || typeof(options) !== 'object'){
        var name = (options === undefined || options === null) ? "" : options;
        options = { name: String(name) };
    } 
    if(options === undefined) options = {};
    var datacloneerr = new DOMException.DOMException(DOMException.DATA_CLONE_ERR);
    //3. (NOT SUPPORTED) Let outside settings be the current settings object.
    //4. (NOT SUPPORTED) Parse scriptURL relative to outside settings.
    //5. (NOT SUPPORTED) If this fails, throw a "SyntaxError" DOMException.
    //6. Otherwise, let urlRecord be the resulting URL record.
    var urlRecord = String(scriptURL);
    options.url = urlRecord;
    var lastescape = urlRecord.lastIndexOf('/');
    console.log('URL Record: '+urlRecord);
    if(urlRecord.length >= 6 && urlRecord.substring(0, 7) === 'http://'){
        //in this case we try to parse URL
        console.log('Going to parse URL '+urlRecord);
        urlRecord = URL.parse(urlRecord);
    }
    if(lastescape !== -1){
        urlRecord = urlRecord.substring(lastescape+1, urlRecord.length);
    }
    var hash = "";
    var hashindex = urlRecord.lastIndexOf("#");
    if(hashindex !== -1){
        hash = urlRecord.substring(hashindex, urlRecord.length);
        urlRecord = urlRecord.substring(0, hashindex);
        console.log('SharedWorker, found hash: '+hash);
    }
    if(urlRecord.length < 3 || urlRecord.substring(urlRecord.length - 3, urlRecord.length) !== ".js"){
        urlRecord = urlRecord + ".js";
    }
    options.hash = hash;
    var optionsSerialized = StructuredSerializeInternal(options, false, datacloneerr);
    //7. Let worker be a new SharedWorker object.
    var worker = this;
    //8. Let outside port be a new MessagePort in outside settings's Realm.
    var outsidePort = new MessagePort.PublicMessagePort();
    //9. Assign outside port to the port attribute of worker.
    worker.__port = outsidePort;
    //10. (NOT SUPPORTED) Let callerIsSecureContext be true if outside settings is a secure context; otherwise, false.
    //11. Enqueue the following steps to the shared worker manager:
    if (urlRecord.length > 3){
        if(options.name !== undefined){ 
            var conf_exists = MPSem.conf_exists(options.name);
            //console.log('Conf exists? '+conf_exists);
            if(conf_exists)
              worker.__id = MPSem.create_with_id(options.name, urlRecord, "__rerunConf", [urlRecord, outsidePort.__id, true, optionsSerialized]);
            else
              worker.__id = MPSem.create_with_id(options.name, urlRecord, "__setupConf", [urlRecord, outsidePort.__id, true, optionsSerialized]);
        } else {
            worker.__id = MPSem.create(urlRecord, "__setupConf", [urlRecord, outsidePort.__id, true, optionsSerialized])
        }
    }
    SharedWorker.prototype.creating = false;
    //12. Return worker.
    return worker;
}

SharedWorker.prototype = Object.create(EventTarget.EventTarget.prototype);

SharedWorker.prototype.ids = {};

Object.defineProperty(SharedWorker.prototype, 'onmessage', {
    /*
    * @id SharedWorkerOnMessage
    */
    set: function(f){
        this.__port.__Enabled = true;
        if(this.__port.__onmessagehandler) this.__port.removeEventListener('message', this.__port.__onmessagehandler);
        this.__port.__onmessagehandler = f;
        this.__port.addEventListener('message', f);
    }
});

Object.defineProperty(SharedWorker.prototype, 'onerror', {
    /*
    * @id SharedWorkerOnError
    */
    set: function(f){
        this.__port.__Enabled = true;
        this.__port.addEventListener('error', f);
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
        //throw new Error('SharedWorker port is readonly')
        console.log('SharedWorker port is readonly');
    },
    get: function(){
        return this.__port;
    }
});

exports.SharedWorker = SharedWorker;