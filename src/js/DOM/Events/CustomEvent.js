//const Event = require('./Event');

/*
* @id initCustomEvent
*/
var initCustomEvent = function(Event){
    /*
    * @id CustomEvent
    */
    var CustomEvent = function(type, customEventInit){
        Event.Event.call(this, type, customEventInit);
        this.detail = null;
        if(customEventInit && customEventInit.detail){
            this.detail = customEventInit.detail;
        }
    };

    CustomEvent.prototype = Object.create(Event.Event.prototype);

    /*
    * @id CustomEventInitCustomEvent
    */
    CustomEvent.prototype.initCustomEvent = function(type, bubbles, cancelable, detail){
        //1. If the context object’s dispatch flag is set, then return.
        if(this.dispatch){
            return;
        }
        //2. Initialize the context object with type, bubbles, and cancelable.
        this.initEvent(type, bubbles, cancelable);
        //3. Set the context object’s detail attribute to detail.
        if(detail){
            this.detail = detail;
        }
    };

    return {'CustomEvent': CustomEvent};
};

module.exports = initCustomEvent;

