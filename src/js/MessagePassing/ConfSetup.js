const DedicatedWorkerGlobalScope = require('./WebWorkers/DedicatedWorkerGlobalScope');
const SharedWorkerGlobalScope    = require('./WebWorkers/SharedWorkerGlobalScope');
const IFrameGlobalScope          = require('../MessagePassing/WebWorkers/IFrameGlobalScope');
const MessagePort                = require('./PostMessage/MessagePort');
const MPSemantics                = require('./Common/MPSemantics');
const EventSemantics             = require('../DOM/Events/EventsSemantics');
const MessageEvent               = require('../DOM/Events/MessageEvent');
const Window                     = require('../DOM/Events/Window');
const WorkerInfo                 = require('./WebWorkers/Worker');

JSILSetGlobalObjProp("DedicatedWorkerGlobalScope", DedicatedWorkerGlobalScope);
JSILSetGlobalObjProp("SharedWorkerGlobalScope", SharedWorkerGlobalScope);
JSILSetGlobalObjProp("IFrameGlobalScope", IFrameGlobalScope);
JSILSetGlobalObjProp("MessagePort", MessagePort);
JSILSetGlobalObjProp("MessageEvent", MessageEvent);
JSILSetGlobalObjProp("MPSemantics", MPSemantics);
JSILSetGlobalObjProp("EventSemantics", EventSemantics);
JSILSetGlobalObjProp("Window", Window);
JSILSetGlobalObjProp("WorkerInfo", WorkerInfo);


/*
* @JSIL
* @id __setupConf
*/
function __setupConf(workerURL, outsidePortId, isShared, options, main_fid){
    // First thing to be executed in every worker. Script file needs to import this file. This function needs to be executed before the script.
    executeJSILProc("mainConfSetup");
    var global = executeJSILProc("JSILGetGlobal");
    var optionsDeserialized = StructuredDeserialize(options);  
    var globalObj = isShared ? new global.SharedWorkerGlobalScope.SharedWorkerGlobalScope(global, optionsDeserialized.name, global.WorkerInfo) : new global.DedicatedWorkerGlobalScope.DedicatedWorkerGlobalScope(global, workerURL, global.WorkerInfo) ;
    // Create inside port and associate it with global object
    // 16. Let inside port be a new MessagePort object in inside settings's Realm.
    //console.log('WORKER: Going to create inside port');
    var insidePort = new global.MessagePort.PublicMessagePort();
    //TODOMP: check if this call to start() should be here!
    insidePort.start();
    //console.log('WORKER: created inside port with id '+insidePort.__id);
    // 17. Associate inside port with worker global scope.
    globalObj.__port = insidePort;
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
    if(globalObj.hasOwnProperty('onconnect')){
        var event = new global.MessageEvent.MessageEvent("connect");
        event.data = "";
        event.ports = [globalObj.__port];
        Object.freeze(event.ports);
        event.source = insidePort;
        globalObj.dispatchEvent(event);
    }
}

/*
* @JSIL
* @id __setupIFrameContext
*/
function __setupIFrameContext(outsidePortId, mainId, proxyIFrameId, main_fid){
    // First thing to be executed in every IFrame. Script file needs to import this file. This function needs to be executed before the script.
    executeJSILProc("mainConfSetup");
    console.log('__setupIFrameContext');
    var global = executeJSILProc("JSILGetGlobal");  
    var insidePort = new global.MessagePort.PublicMessagePort();
    var context = new global.IFrameGlobalScope.IFrameGlobalScope(global, mainId, proxyIFrameId);
    // Create inside port and associate it with global object
    // 16. Let inside port be a new MessagePort object in inside settings's Realm.
    //console.log('WORKER: Going to create inside port');
    //TODOMP: check if this call to start() should be here!
    insidePort.start();
    //insidePort.targetWindow = global.Window.getInstance(mainId);
    //console.log('targetWindowId? '+insidePort.targetWindow.__id);
    //console.log('WORKER: created inside port with id '+insidePort.__id);
    // 17. Associate inside port with worker global scope.
    var window = global.Window.getInstance(proxyIFrameId);
    window.__port = insidePort;
    //var parent = global.Window.getInstance(mainId);
    parent.__port = insidePort;
    context.__port = insidePort;
    var MPSem = global.MPSemantics.getMPSemanticsInstance();
    // 18. Entangle outside port and inside port.
    MPSem.unpairPort(outsidePortId);
    MPSem.unpairPort(insidePort.__id);
    //console.log('Pairing ports '+outsidePortId+' and '+insidePort.__id);
    MPSem.pairPorts(outsidePortId, insidePort.__id);
    global.Window.setInstance(proxyIFrameId);
    executeJSILProc(main_fid);
}
