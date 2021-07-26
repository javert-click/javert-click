const WorkerGlobalScope = require('./WorkerGlobalScope');

/*
* @id SharedWorkerGlobalScope
*/
function SharedWorkerGlobalScope(global, name, WorkerInfo){
    WorkerGlobalScope.WorkerGlobalScope.call(this, name, global, WorkerInfo);

    var scope = this;

    Object.defineProperty(global, 'onconnect', {
        /*
        * @id SharedWorkerGlobalScopeOnConnect
        */
        set: function(f){
            scope.addEventListener('connect', f);
        }
    });

    Object.defineProperty(global, 'self', {
        /*
        * @id SharedWorkerGlobalScopeGetSelf
        */
        get: function(){
            return scope;
        }
    });

    Object.defineProperty(global, 'addEventListener', {
        /*
        * @id SharedWorkerGlobalScopeAddEventListener
        */
        get: function(){
          return scope.addEventListener.bind(scope);
        }
    });
    
    Object.defineProperty(global, 'removeEventListener', {
        /*
        * @id SharedWorkerGlobalScopeRemoveEventListener
        */
        get: function(f){
            return scope.removeEventListener.bind(scope);
        }
    });

    Object.defineProperty(global, 'dispatchEvent', {
        /*
        * @id SharedWorkerGlobalScopeDispatchEvent
        */
        get: function(f){
            return scope.dispatchEvent;
        }
    });

    Object.defineProperty(global, 'onerror', {
        /*
        * @id SharedWorkerGlobalScopeOnError
        */
        set: function(f){
            scope.addEventListener('error', f);
        }
    });


    scope.onconnect = global.onconnect;
    scope.self = global.self;
    scope.addEventListener = global.addEventListener;
    scope.removeEventListener = global.removeEventListener;
    scope.dispatchEvent = scope.dispatchEvent;
    scope.onerror = global.onerror;

    return scope;
}

SharedWorkerGlobalScope.prototype = Object.create(WorkerGlobalScope.WorkerGlobalScope.prototype);

SharedWorkerGlobalScope.close = function(){
    // TODO: implement
}

exports.SharedWorkerGlobalScope = SharedWorkerGlobalScope