const EventTarget = require('../../DOM/Events/EventTarget');

/*
* @id WorkerGlobalScope
*/
function WorkerGlobalScope(name){
    EventTarget.EventTarget.call(this);
    this.__name = name;
}

// TODO: this interface has a lot more than this.

WorkerGlobalScope.prototype = Object.create(EventTarget.EventTarget.prototype);

exports.WorkerGlobalScope = WorkerGlobalScope;