/**********************/
/* INTERFACE UI EVENT */
/**********************/

//const Event     = require('./Event');
//const Window    = require('./Window');

/*
* @id initUIEvent
*/
var initUIEvent = function(Event, Window){

    /*
    * @id UIEvent
    */
    var UIEvent = function(type, eventInitDict){
        if(eventInitDict && eventInitDict.view && !(eventInitDict.view instanceof Window.Window)){
            throw new TypeError();
        }
        Event.Event.call(this, type, eventInitDict);
        this.view = null;
        this.detail = 0;
        if(eventInitDict && eventInitDict.view){
            this.view = eventInitDict.view;
        }
        if(eventInitDict && eventInitDict.detail){
            this.detail = eventInitDict.detail;
        }
    };

    UIEvent.prototype = Object.create(Event.Event.prototype);

    Object.defineProperty(Window.Window.prototype, 'UIEvent', {
        /*
        * @id UIEventGet
        */
        get: function(){
            return UIEvent;
        }
    });

    return {UIEvent: UIEvent};
}

module.exports     = initUIEvent;