/*
* @id initMessagePassing
*/
var initMessagePassing = function(){
    /* ------ DOM ------ */
    var DOM                            = initDOM();
    
    /* ------ Message Passing ------ */
    var MP                             = {};

    MP.JS2JSILList                     = initJS2JSILList();
    MP.ObjectUtils                     = initObjectUtils();
    
    MP.MPSemantics                     = new ((initMPSemantics(MP.JS2JSILList)).MPSemantics)();
    MP.EventsSemantics                 = new ((initEventsSemantics()).EventsSemantics)();

    MP.EventsSemantics.addHandler("ProcessMessage", "processMessageSteps");

    /* PostMessage */
    MP.MessagePort                     = initMessagePort(MP.MPSemantics, DOM.EventTarget, DOM.DOMException, DOM.ArrayUtils, MP.Serialization, DOM.MessageEvent);
    MP.MessageChannel                  = initMessageChannel(MP.MessagePort, MP.MPSemantics);
    MP.MessageEvent                    = initMessageEvent(DOM.Event);

    /* WebWorkers */
    MP.WorkerGlobalScope               = initWorkerGlobalScope(DOM.EventTarget);
    MP.DedicatedWorkerGlobalScope      = initDedicatedWorkerGlobalScope(MP.WorkerGlobalScope);
    MP.SharedWorkerGlobalScope         = initSharedWorkerGlobalScope(MP.WorkerGlobalScope);
    MP.SharedWorker                    = initSharedWorker(DOM.EventTarget);
    MP.Worker                          = initWorker(MP.MessagePort, DOM.EventTarget, MP.SharedWorker, MP.WorkerGlobalScope, MP.SharedWorkerGlobalScope, MP.MPSemantics);

    MP.DOM                             = DOM;

    return MP;
}