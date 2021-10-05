const WorkerGlobalScope = require('./WorkerGlobalScope');

/*
* @id SharedWorkerGlobalScope
*/
function SharedWorkerGlobalScope(global, options, WorkerInfo){
    WorkerGlobalScope.WorkerGlobalScope.call(this, options, global, WorkerInfo);

    var scope = this;

    Object.defineProperty(global, 'onconnect', {
        /*
        * @id SharedWorkerGlobalScopeOnConnect
        */
        set: function(f){
            if(typeof f !== 'function' && typeof f !== 'object'){
                scope.__onconnecthandler = null;
            }else{
                if(scope.__onconnecthandler){
                    scope.removeEventListener('connect', scope.__onconnecthandler);
                }
                scope.__onconnecthandler = f;
                scope.addEventListener('connect', f);
            }
        },
        get: function(){
            return scope.__onconnecthandler;
        }
    });

    Object.defineProperty(scope, 'onconnect', {
        get: function(){
            return global.onconnect;
        },
        set: function(f){
            global.onconnect = f;
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
            if(scope.__onerrorhandler){
                scope.removeEventListener('error', scope.__onerrorhandler);
            }
            scope.__onerrorhandler = f;
            scope.addEventListener('error', f);
        },
        get: function(){
            return scope.__onerrorhandler;
        }
    });

    Object.defineProperty(global, 'ApplicationCache', {});

    function replicatePropInScope(xsc, prop){
        Object.defineProperty(xsc, prop, {
            get: function(){
                return global[prop];
            }
        });
    }

    replicatePropInScope(scope, 'ApplicationCache');
    replicatePropInScope(scope, 'onerror');
    replicatePropInScope(scope, 'SharedWorkerGlobalScope');
    
    return scope;
}

SharedWorkerGlobalScope.prototype = Object.create(WorkerGlobalScope.WorkerGlobalScope.prototype);

SharedWorkerGlobalScope.close = function(){
    // TODO: implement
}

exports.SharedWorkerGlobalScope = SharedWorkerGlobalScope