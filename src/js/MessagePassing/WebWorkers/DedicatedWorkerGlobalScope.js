const WorkerGlobalScope = require('./WorkerGlobalScope');

/*
* @id DedicatedWorkerGlobalScope
*/
function DedicatedWorkerGlobalScope (global, name, WorkerInfo) {

    WorkerGlobalScope.WorkerGlobalScope.call(this, name, global, WorkerInfo);

    var scope = this;

    Object.defineProperty(global, 'self', {
        /*
        * @id DedicatedWorkerGlobalSelf
        */
        get: function(){
            return this;
        }
    });
    Object.defineProperty(global, 'onmessage', {
        /*
        * @id DedicatedWorkerGlobalScopeOnMessage
        */
        set: function(f){
            scope.__port.__Enabled = true;
            if(scope.__port.__onmessagehandler) scope.__port.removeEventListener('message', scope.__port.__onmessagehandler);
            scope.__port.__onmessagehandler = f;
            scope.__port.addEventListener('message', f);
        }
    });
    Object.defineProperty(global, 'onerror', {
        /*
        * @id DedicatedWorkerGlobalScopeOnError
        */
        set: function(f){
            scope.__port.addEventListener('error', f);
        }
    });
    Object.defineProperty(global, 'onoffline', {
        /*
        * @id DedicatedWorkerGlobalScopeOnOffline
        */
        set: function(f){
            scope.__port.addEventListener('offline', f);
        }
    });
    Object.defineProperty(global, 'ononline', {
        /*
        * @id DedicatedWorkerGlobalScopeOnOnline
        */
        set: function(f){
            scope.__port.addEventListener('online', f);
        }
    });
    Object.defineProperty(global, 'addEventListener', {
        /*
        * @id DedicatedWorkerGlobalScopeAddEventListener
        */
        get: function(){
          return scope.__port.addEventListener.bind(scope.__port);
        }
    });
    Object.defineProperty(global, 'removeEventListener', {
        /*
        * @id DedicatedWorkerGlobalScopeRemoveEventListener
        */
        get: function(f){
            return scope.__port.removeEventListener.bind(scope.__port);
        }
    });
    Object.defineProperty(global, 'dispatchEvent', {
        /*
        * @id DedicatedWorkerGlobalScopeDispatchEvent
        */
        get: function(f){
            return scope.__port.dispatchEvent;
        }
    });

    Object.defineProperty(global, 'onmessageerror', {
        /*
        * @id DedicatedWorkerGlobalScopeOnMessageError
        */
        set: function(f){
            scope.__port.addEventListener('messageerror', f);
        }
    });

    Object.defineProperty(global, 'postMessage', {
        /*
        * @id DedicatedWorkerGlobalScopePostMessage
        */
        get: function(){
            //console.log('Going to postMessage from worker. Do I have port? '+this.__port);
            if(!scope.__postMessage){
                var port = scope.__port;
                return port.postMessage.bind(port);
            } else{
                return scope.__postMessage;
            }
        },
        set: function(f){
            scope.__postMessage = f;
        }
    });

    return scope;
}

DedicatedWorkerGlobalScope.prototype = Object.create(WorkerGlobalScope.WorkerGlobalScope.prototype);

exports.DedicatedWorkerGlobalScope = DedicatedWorkerGlobalScope;