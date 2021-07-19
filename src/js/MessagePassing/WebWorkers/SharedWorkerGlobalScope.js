const WorkerGlobalScope = require('./WorkerGlobalScope');

/*
* @id SharedWorkerGlobalScope
*/
function SharedWorkerGlobalScope(global, name){
    WorkerGlobalScope.WorkerGlobalScope.call(this, name);

    var scope = this;

    Object.defineProperty(global, 'onconnect', {
        /*
        * @id SharedWorkerGlobalScopeOnConnect
        */
        set: function(f){
            scope.addEventListener('connect', f);
        }
    });

    scope.onconnect = global.onconnect;

    return scope;
}

SharedWorkerGlobalScope.prototype = Object.create(WorkerGlobalScope.WorkerGlobalScope.prototype);

SharedWorkerGlobalScope.close = function(){
    // TODO: implement
}

exports.SharedWorkerGlobalScope = SharedWorkerGlobalScope