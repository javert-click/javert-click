const Event = require('./Event');

/*
* @id ErrorEvent
*/
function ErrorEvent(type){
    var type = type !== undefined ? type : "error";
    Event.Event.call(this, type);
    ErrEvent_construct(this);
    this.message        = "";
    this.linenno        = -1;
    this.colno          = -1;
    this.bubbles        = false;
    this.cancelable     = true;
    this.filename       = location.href;
    this.error          = null;
    this.lineno         = -1;
    this.type           = type;
    this.initialized    = true;

    this.NONE = 0;
    this.CAPTURING_PHASE = 1;
    this.AT_TARGET = 2;
    this.BUBBLING_PHASE = 3;
};

ErrorEvent.prototype = Object.create(Event.Event.prototype);

exports.ErrorEvent = ErrorEvent;