const WorkerGlobalScope = require('./WorkerGlobalScope');

/*
* @id SharedWorkerGlobalScope
*/
function SharedWorkerGlobalScope(name){
    WorkerGlobalScope.WorkerGlobalScope.call(this, name);
}

SharedWorkerGlobalScope.prototype = Object.create(WorkerGlobalScope.WorkerGlobalScope.prototype);

Object.defineProperty(SharedWorkerGlobalScope.prototype, 'onconnect', {
    /*
    * @id SharedWorkerGlobalScopeOnConnect
    */
    set: function(f){
        this.addEventListener('connect', f);
    }
});

SharedWorkerGlobalScope.close = function(){
    // TODO: implement
}

exports.SharedWorkerGlobalScope = SharedWorkerGlobalScope