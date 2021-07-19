/*
* @id DedicatedWorkerGlobalScope
*/
function DedicatedWorkerGlobalScope (global) {
    Object.defineProperty(global, 'addEventListener', {
        /*
        * @id DedicatedWorkerGlobalAddEventListener
        */
        get: function(){
            return this.__port.addEventListener.bind(this.__port);
        }
    });
    Object.defineProperty(global, 'onmessage', {
        /*
        * @id DedicatedWorkerGlobalScopeOnMessage
        */
        set: function(f){
            this.__port.__Enabled = true;
            this.__port.addEventListener('message', f);
        }
    });
    Object.defineProperty(global, 'onerror', {
        /*
        * @id DedicatedWorkerGlobalScopeOnError
        */
        set: function(f){
            this.__port.addEventListener('error', f);
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
            return port.postMessage.bind(port);
        }
    });
    return global;
}

exports.DedicatedWorkerGlobalScope = DedicatedWorkerGlobalScope;