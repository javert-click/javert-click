const Event = require('./Event');
const Window = require('./Window');

/*
* @id MessageEvent
*/
function MessageEvent(type){
    var type = type !== undefined ? type : "message";
    Event.Event.call(this, type);
    this.data        = "";
    this.ports       = [];
    this.origin      = "";
    this.lastEventId = "";
    this.source      = null;
    MessageEvent_construct(this);
};

MessageEvent.prototype = Object.create(Event.Event.prototype);

MessageEvent.prototype.initMessageEvent = function(type, bubbles, cancelable, data, origin, lastEventId, source, ports){
    var args = arguments;
    if(args.length === 0) throw new TypeError("Failed to execute 'initMessageEvent' on 'MessageEvent': 1 argument required, but 0 provided");
    this.type = type;
    this.bubbles = bubbles || false;
    this.cancelable = cancelable || false;
    this.data = data || null;
    this.origin = origin || "";
    this.lastEventId = lastEventId || "";
    this.source = source || null;
    this.ports = ports || [];
}

Object.defineProperty(Window.Window.prototype, 'MessageEvent', {
    get: function(){
        return MessageEvent;
    }
});

exports.MessageEvent = MessageEvent;