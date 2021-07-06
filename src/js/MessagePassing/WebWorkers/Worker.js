const EventTarget       = require('../../DOM/Events/EventTarget');
const MPSemantics       = require('../Common/MPSemantics');
const MessagePort       = require('../PostMessage/MessagePort');
const SharedWorker      = require('./SharedWorker');
const WorkerGlobalScope = require('./WorkerGlobalScope');

var MPSem = MPSemantics.getMPSemanticsInstance();

/*
* @id Worker
*/
function Worker(scriptURL, options){
    EventTarget.EventTarget.call(this);
    // 1. The user agent may throw a "SecurityError" DOMException if the request violates a policy decision.
    // 2. Let outside settings be the current settings object.
    var outsideSettings = null;
    // 3. Parse the scriptURL argument relative to outside settings.
    try{
    //    var url = parseURL(scriptURL, outsideSettings);
    // 4. If this fails, throw a "SyntaxError" DOMException.
    }catch(e){
    //    throw SyntaxError();
    }
    // 5. let worker URL be the resulting URL record.
    //var workerURL = url.urlRecord;
    var workerURL = scriptURL;
    // 6. Let worker be a new Worker object. 
    var worker = Worker_construct(this);
    // 7. Create a new MessagePort object whose owner is outside settings. Let this be the outside port
    var outsidePort = new MessagePort.PublicMessagePort();
    // 8. Associate the outside port with worker
    worker.__port = outsidePort;
    // 9. Run this step in parallel: Run a worker given worker, worker URL, outside settings, outside port, and options.
    runWorker(worker, workerURL, outsideSettings, outsidePort, options);
    // 10. Return worker.
    return worker;
}

Worker.prototype = Object.create(EventTarget.EventTarget.prototype);

Object.defineProperty(Worker.prototype, 'onmessage', {
    /*
    * @id WorkerOnMessage
    */
    set: function(f){
        this.__port.__Enabled = true;
        this.__port.addEventListener('message', f);
    }
});

Object.defineProperty(Worker.prototype, 'onerror', {
    /*
    * @id WorkerOnError
    */
    set: function(f){
        this.__port.addEventListener('error', f);
    }
});

Object.defineProperty(Worker.prototype, 'onmessageerror', {
    /*
    * @id WorkerOnMessageError
    */
    set: function(f){
        this.__port.addEventListener('messageerror', f);
    }
});

/*
* @id WorkerPostMessage
*/
Worker.prototype.postMessage = function(){
    this.__port.postMessage.apply(this.__port, arguments);
}

Worker.prototype.terminate = function(){
    MPSem.terminate(this.__id);
}

/*
* @id runWorker
*/
function runWorker(worker, workerURL, outsideSettings, outsidePort, options){
    // 1. Let is shared be true if worker is a SharedWorker object, and false otherwise.
    var isShared = worker instanceof SharedWorker.SharedWorker;
    // 2. Let owner be the relevant owner to add given outside settings.
    var owner; // TODO: how do we set/obtain those settings?
    // 3. Let parent worker global scope be null.
    var parentWorkerGlobalScope = null;
    // 4. If owner is a WorkerGlobalScope object (i.e., we are creating a nested dedicated worker), then set parent worker global scope to owner.
    if(owner instanceof WorkerGlobalScope.WorkerGlobalScope) parentWorkerGlobalScope = owner;
    // 5. Let agent be the result of obtaining a dedicated/shared worker agent given outside settings and is shared. Run the rest of these steps in that agent.
    // 6. Let realm execution context be the result of creating a new JavaScript realm given agent and the following customizations:
    // For the global object, if is shared is true, create a new SharedWorkerGlobalScope object. Otherwise, create a new DedicatedWorkerGlobalScope object.
    //var workerGlobalObj = isShared ? new SharedWorkerGlobalScope.SharedWorkerGlobalScope(workerURL) : new DedicatedWorkerGlobalScope.DedicatedWorkerGlobalScope(workerURL);
    //worker.__id = MPSemantics.create(workerURL, "__setupConf", [workerURL, outsidePort.__id, isShared]);
    worker.__id = MPSem.create(workerURL, "__setupConf", outsidePort.__id, isShared);
}

exports.Worker = Worker;