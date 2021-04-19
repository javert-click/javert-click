const WorkerGlobalScope = require('./WorkerGlobalScope');

/*
* @id DedicatedWorkerGlobalScope
*/
function DedicatedWorkerGlobalScope(name){
    WorkerGlobalScope.WorkerGlobalScope.call(this, name);
}

DedicatedWorkerGlobalScope.prototype = Object.create(WorkerGlobalScope.WorkerGlobalScope.prototype);

Object.defineProperty(DedicatedWorkerGlobalScope.prototype, 'onmessage', {
    /*
    * @id DedicatedWorkerGlobalScopeOnMessage
    */
    set: function(f){
        this.__port.addEventListener('message', f);
    }
});

Object.defineProperty(DedicatedWorkerGlobalScope.prototype, 'onmessageerror', {
    /*
    * @id DedicatedWorkerGlobalScopeOnMessageError
    */
    set: function(f){
        this.__port.addEventListener('messageerror', f);
    }
});

DedicatedWorkerGlobalScope.prototype.postMessage = function(message, options){
    // when invoked, it immediately invoked the respective postMessage(message, transfer) and postMessage(message, options) on the port, 
    // with the same arguments, and returned the same return value.
    this.__port.postMessage(message, options);
}

DedicatedWorkerGlobalScope.prototype.close = function(){
    // TODO implement!
}

/*
* @id DedicatedWorkerGlobalScopeAlternative
*/
function DedicatedWorkerGlobalScopeAlternative (global, name) {
    console.log('DedicatedWorkerGlobalScopeAlternative');
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
exports.DedicatedWorkerGlobalScopeAlternative = DedicatedWorkerGlobalScopeAlternative;