//const WorkerGlobalScope = require('./WorkerGlobalScope');

/*
* @id DedicatedWorkerGlobalScope
*/
function DedicatedWorkerGlobalScope (global, name) {
    Object.defineProperty(global, 'onmessage', {
        /*
        * @id DedicatedWorkerGlobalScopeOnMessage
        */
        set: function(f){
            this.__port.__Enabled = true;
            this.__port.addEventListener('message', f);
        }
    });
    Object.defineProperty(global, 'onmessageerror', {
        /*
        * @id DedicatedWorkerGlobalScopeOnMessageError
        */
        set: function(f){
            this.__port.addEventListener('messageerror', f);
        }
    });

    Object.defineProperty(global, 'postMessage', {
        /*
        * @id DedicatedWorkerGlobalScopePostMessage
        */
        get: function(){
            var port = this.__port;
            return function(message, options) { port.postMessage(message, options)};
        }
    });
}

exports.DedicatedWorkerGlobalScope = DedicatedWorkerGlobalScope;