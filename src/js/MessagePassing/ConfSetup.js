const DedicatedWorkerGlobalScope = require('./WebWorkers/DedicatedWorkerGlobalScope');
const SharedWorkerGlobalScope    = require('./WebWorkers/SharedWorkerGlobalScope');
const MessagePort                = require('./PostMessage/MessagePort');
const MPSemantics                = require('./Common/MPSemantics');
const EventSemantics             = require('../DOM/Events/EventsSemantics');
const MessageEvent               = require('../DOM/Events/MessageEvent');
const Window                     = require('../DOM/Events/Window');

JSILSetGlobalObjProp("DedicatedWorkerGlobalScope", DedicatedWorkerGlobalScope);
JSILSetGlobalObjProp("SharedWorkerGlobalScope", SharedWorkerGlobalScope);
JSILSetGlobalObjProp("MessagePort", MessagePort);
JSILSetGlobalObjProp("MessageEvent", MessageEvent);
JSILSetGlobalObjProp("MPSemantics", MPSemantics);
JSILSetGlobalObjProp("EventSemantics", EventSemantics);
JSILSetGlobalObjProp("Window", Window);

/*
* @JSIL
* @id __setupConf
*/
function __setupConf(workerURL, outsidePortId, isShared, parentWindowId, main_fid){
    // First thing to be executed in every worker. Script file needs to import this file. This function needs to be executed before the script.
    executeJSILProc("mainConfSetup");
    var global = executeJSILProc("JSILGetGlobal");  
    //console.log('WORKER: setupInitialHeap executed successfully!');
    //global.__scopeMP = MP.MessagePort.MessagePort.__scopeMP;
    //console.log('WORKER: initMessagePassing executed successfully');
    var workerGlobalObj = isShared ? new global.SharedWorkerGlobalScope.SharedWorkerGlobalScope(global, workerURL, parentWindowId) : new global.DedicatedWorkerGlobalScope.DedicatedWorkerGlobalScope(global, workerURL, parentWindowId);
    // Create inside port and associate it with global object
    // 16. Let inside port be a new MessagePort object in inside settings's Realm.
    //console.log('WORKER: Going to create inside port');
    var insidePort = new global.MessagePort.PublicMessagePort();
    //TODOMP: check if this call to start() should be here!
    insidePort.start();
    insidePort.targetWindow = global.Window.getInstance();
    //console.log('WORKER: created inside port with id '+insidePort.__id);
    // 17. Associate inside port with worker global scope.
    workerGlobalObj.__port = insidePort;
    // TODOMP: fix this!
    //parent.__port = insidePort;
    var MPSem = global.MPSemantics.getMPSemanticsInstance();
    // 18. Entangle outside port and inside port.
    MPSem.unpairPort(outsidePortId);
    MPSem.unpairPort(insidePort.__id);
    MPSem.pairPorts(outsidePortId, insidePort.__id);
    //console.log('WORKER: just paired ports '+outsidePortId+' and '+insidePort.__id);
    // 23. If script is a classic script, then run the classic script script. Otherwise, it is a module script; run the module script script.
    executeJSILProc(main_fid);
    //console.log('WORKER: going to add handler for process message event');
    //EventsSemantics.addHandler("ProcessMessage", "processMessageSteps");
    //console.log('WORKER: handler for process message event added!');
    // 26. If is shared is true, then queue a global task on DOM manipulation task source given worker global scope to 
     // fire an event named connect at worker global scope, using MessageEvent, 
     // with the data attribute initialized to the empty string, 
     // the ports attribute initialized to a new frozen array containing inside port, 
     // and the source attribute initialized to inside port.
    if(workerGlobalObj.hasOwnProperty('onconnect')){
        var event = new global.MessageEvent.MessageEvent("connect");
        event.data = "";
        event.ports = [workerGlobalObj.__port];
        Object.freeze(event.ports);
        event.source = insidePort;
        workerGlobalObj.dispatchEvent(event);
    }
}
