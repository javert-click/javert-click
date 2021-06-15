const WorkerGlobalScope = require('./WorkerGlobalScope');

/*
* @id SharedWorkerGlobalScope
*/
function SharedWorkerGlobalScope(global, name){
    //WorkerGlobalScope.WorkerGlobalScope.call(this, name);

    Object.defineProperty(global, 'onconnect', {
        /*
        * @id SharedWorkerGlobalScopeOnConnect
        */
        set: function(f){
            this.addEventListener('connect', f);
        }
    });

    return global;
}

SharedWorkerGlobalScope.prototype = Object.create(WorkerGlobalScope.WorkerGlobalScope.prototype);

SharedWorkerGlobalScope.close = function(){
    // TODO: implement
}

exports.SharedWorkerGlobalScope = SharedWorkerGlobalScope