const Event = require('./Event');
const Window = require('./Window');

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

Object.defineProperty(Window.Window.prototype, 'MessageEvent', {
    get: function(){
        return MessageEvent;
    }
});

/*
* @id MessageEventToString
*/
MessageEvent.prototype.toString = function(){
    console.log('executing toString MessageEvent');
    return '[object MessageEvent]';
}

exports.MessageEvent = MessageEvent;