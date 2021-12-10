JSILSetGlobalObjProp("DedicatedWorkerGlobalScope", DedicatedWorkerGlobalScope);
//JSILSetGlobalObjProp("SharedWorkerGlobalScope", SharedWorkerGlobalScope);
//JSILSetGlobalObjProp("IFrameGlobalScope", IFrameGlobalScope);
JSILSetGlobalObjProp("MessagePort", MessagePort);
JSILSetGlobalObjProp("MessageEvent", MessageEvent);
JSILSetGlobalObjProp("getMPSemanticsInstance", getMPSemanticsInstance);
JSILSetGlobalObjProp("Window", Window);
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
    var globalObj = isShared ? new global.SharedWorkerGlobalScope(global, optionsDeserialized) : new global.DedicatedWorkerGlobalScope(global, optionsDeserialized) ;
    global.globalObj = globalObj;
    //console.log('Running __setupConf, isShared: '+isShared);
    //globalObj.location = global.location;
    //globalObj.location.hash = optionsDeserialized.hash;
    // Create inside port and associate it with global object
    // 16. Let inside port be a new MessagePort object in inside settings's Realm.
    //console.log('WORKER: Going to create inside port');
    var insidePort = new global.PublicMessagePort();
    insidePort.start();
    //console.log('WORKER: created inside port with id '+insidePort.__id);
    // 17. Associate inside port with worker global scope.
    globalObj.__port = insidePort;
    var MPSem = global.getMPSemanticsInstance();
    // 18. Entangle outside port and inside port.
    MPSem.unpairPort(outsidePortId);
    MPSem.unpairPort(insidePort.__id);
    MPSem.pairPorts(outsidePortId, insidePort.__id);
    //console.log('WORKER: just paired ports '+outsidePortId+' and '+insidePort.__id);
    // 23. If script is a classic script, then run the classic script script. Otherwise, it is a module script; run the module script script.
    try{
        global.wrapperExecJSILProc(main_fid);
    } catch (e){
        console.log('Got error from script!'+e);
        if(globalObj.__onerrorhandler){
          //error handled locally
          globalObj.__onerrorhandler.apply(self, [e.message || "", location.href, -1, -1, e])
        }else{
          //send back to main thread
          e.filename = location.href;
          console.log('error.message: '+e.message);
          console.log('e.toString(): '+e.toString());
          var error_msg = {'ERROR_MSG':e};
          console.log('Going to send error message to main thread');
          postMessage(error_msg);
          console.log('Error msg sent back to main thread');
        }
    }
    //console.log('WORKER: going to add handler for process message event');
    //EventsSemantics.addHandler("ProcessMessage", "processMessageSteps");
    //console.log('WORKER: handler for process message event added!');
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
    //console.log('Finished running __setupConf');
}

/*
* @id wrapperExecJSILProc
*/
function wrapperExecJSILProc(main_fid){
    return executeJSILProc(main_fid);
}
