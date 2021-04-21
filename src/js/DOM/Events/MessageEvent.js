const Event = require('./Event');

/*
* @id MessageEvent
*/
function MessageEvent(){
    Event.Event.call(this, "message");
    this.data        = "";
    this.ports       = [];
    this.origin      = "";
    this.lastEventId = "";
    this.source      = null;
};

MessageEvent.prototype = Object.create(Event.Event.prototype);

/*
* @id MessageEventToString
*/
MessageEvent.prototype.toString = function(){
    console.log('executing toString MessageEvent');
    return '[object MessageEvent]';
}

exports.MessageEvent = MessageEvent;