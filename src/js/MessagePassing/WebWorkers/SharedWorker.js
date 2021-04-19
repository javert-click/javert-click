const EventTarget = require('../../DOM/Events/EventTarget');

/*
* @id SharedWorker
*/
function SharedWorker(){
    EventTarget.EventTarget.call(this);
}

SharedWorker.prototype = Object.create(EventTarget.EventTarget.prototype);

exports.SharedWorker = SharedWorker;