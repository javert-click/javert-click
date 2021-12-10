const DedicatedWorkerGlobalScope = require('./WebWorkers/DedicatedWorkerGlobalScope');
const SharedWorkerGlobalScope    = require('./WebWorkers/SharedWorkerGlobalScope');
const IFrameGlobalScope          = require('../MessagePassing/WebWorkers/IFrameGlobalScope');
const MessagePort                = require('./WebMessaging/MessagePort');
const Window                     = require('../DOM/Events/Window');
const WorkerInfo                 = require('./WebWorkers/Worker');


JSILSetGlobalObjProp("DedicatedWorkerGlobalScope", DedicatedWorkerGlobalScope.DedicatedWorkerGlobalScope);
JSILSetGlobalObjProp("SharedWorkerGlobalScope", SharedWorkerGlobalScope.SharedWorkerGlobalScope);
JSILSetGlobalObjProp("IFrameGlobalScope", IFrameGlobalScope);
JSILSetGlobalObjProp("MessagePort", MessagePort);
JSILSetGlobalObjProp("Window", Window);
JSILSetGlobalObjProp("WorkerInfo", WorkerInfo);
JSILSetGlobalObjProp("wrapperExecJSILProc", wrapperExecJSILProc);



/*
* @JSIL
* @id __setupConf
*/
function __setupConf(workerURL, outsidePortId, isShared, options, main_fid){
    // First thing to be executed in every worker. Script file needs to import this file. This function needs to be executed before the script.
    executeJSILProc("mainConfSetup");
    var global = executeJSILProc("JSILGetGlobal");
    var optionsDeserialized = StructuredDeserialize(options);  
    var globalObj = isShared ? new global.SharedWorkerGlobalScope(global, optionsDeserialized, global.WorkerInfo) : new global.DedicatedWorkerGlobalScope(global, optionsDeserialized, global.WorkerInfo) ;
    global.globalObj = globalObj;
    console.log('Running __setupConf, isShared: '+isShared);
    // Create inside port and associate it with global object
    // 16. Let inside port be a new MessagePort object in inside settings's Realm.
    var insidePort = new global.MessagePort.PublicMessagePort();
    insidePort.start();
    insidePort.__scope = globalObj;
    // 17. Associate inside port with worker global scope.
    globalObj.__port = insidePort;
    var MPSem = global.MPSemantics.getMPSemanticsInstance();
    // 18. Entangle outside port and inside port.
    MPSem.unpairPort(outsidePortId);
    MPSem.unpairPort(insidePort.__id);
    MPSem.pairPorts(outsidePortId, insidePort.__id);
    // 23. If script is a classic script, then run the classic script script. Otherwise, it is a module script; run the module script script.
    try{
        global.wrapperExecJSILProc(main_fid);
    } catch (e){
        if(globalObj.__onerrorhandler){
          //error handled locally
          globalObj.__onerrorhandler.apply(self, [e.message || "", location.href, -1, -1, e])
        }else{
          //send back to main thread
          e.filename = location.href;
          var error_msg = {'ERROR_MSG':e};
          if(global.postMessage) postMessage(error_msg);
          else if(global.port && global.port.postMessage) global.port.postMessage(error_msg);
        }
    }
    // 26. If is shared is true, then queue a global task on DOM manipulation task source given worker global scope to 
     // fire an event named connect at worker global scope, using MessageEvent, 
     // with the data attribute initialized to the empty string, 
     // the ports attribute initialized to a new frozen array containing inside port, 
     // and the source attribute initialized to inside port.
    if(globalObj.hasOwnProperty('onconnect')){
        var event = new global.MessageEvent("connect");
        event.data = "";
        event.ports = [globalObj.__port];
        Object.freeze(event.ports);
        event.source = insidePort;
        globalObj.dispatchEvent(event);
    }
    console.log('Finished running __setupConf');
}

/*
* @id wrapperExecJSILProc
*/
function wrapperExecJSILProc(main_fid){
    return executeJSILProc(main_fid);
}

/*
* @JSIL
* @id __rerunConf
*/
function __rerunConf(workerURL, outsidePortId, isShared, options, main_fid){
    // First thing to be executed in every worker. Script file needs to import this file. This function needs to be executed before the script.
    //executeJSILProc("mainConfSetup");
    var global = executeJSILProc("JSILGetGlobal");
    // Create inside port and associate it with global object
    // 16. Let inside port be a new MessagePort object in inside settings's Realm.
    var insidePort = new global.MessagePort.PublicMessagePort();
    insidePort.start();
    // 17. Associate inside port with worker global scope.
    globalObj.__port = insidePort;
    var MPSem = global.MPSemantics.getMPSemanticsInstance();
    // 18. Entangle outside port and inside port.
    MPSem.unpairPort(outsidePortId);
    MPSem.unpairPort(insidePort.__id);
    MPSem.pairPorts(outsidePortId, insidePort.__id);
    // 26. If is shared is true, then queue a global task on DOM manipulation task source given worker global scope to 
     // fire an event named connect at worker global scope, using MessageEvent, 
     // with the data attribute initialized to the empty string, 
     // the ports attribute initialized to a new frozen array containing inside port, 
     // and the source attribute initialized to inside port.
    if(globalObj.hasOwnProperty('onconnect')){
        console.log('Going to dispatch connect event');
        var event = new global.MessageEvent("connect");
        event.data = "";
        event.ports = [globalObj.__port];
        Object.freeze(event.ports);
        event.source = insidePort;
        globalObj.dispatchEvent(event);
    }
    console.log('Finished running __setupConf');
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
    // 16. Let inside port be a new MessagePort object in inside settings's Realm.
    //console.log('WORKER: Going to create inside port');
    insidePort.start();
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
    MPSem.pairPorts(outsidePortId, insidePort.__id);
    global.Window.setInstance(proxyIFrameId);
    executeJSILProc(main_fid);
}
