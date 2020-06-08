/*************************/
/* INTERFACE MOUSE EVENT */
/*************************/

//const UIEvent     = require('./UIEvent');
//const Window      = require('./Window');
//const UIEventInit = UIEvent.UIEventInit;

/*
* @id initMouseEvent
*/
var initMouseEvent = function(UIEvent, Window){

    /*
    * @id MouseEvent
    */
    var MouseEvent = function(type, eventInitDict){
        UIEvent.UIEvent.call(this, type, eventInitDict);
        this.screenX       = (eventInitDict && eventInitDict.screenX) ? eventInitDict.screenX : 0;
        this.screenY       = (eventInitDict && eventInitDict.screenY) ? eventInitDict.screenY : 0;
        this.clientX       = (eventInitDict && eventInitDict.clientX) ? eventInitDict.clientX : 0;
        this.clientY       = (eventInitDict && eventInitDict.clientY) ? eventInitDict.clientY : 0;
        this.relatedTarget = (eventInitDict && eventInitDict.relatedTarget) ? eventInitDict.relatedTarget : null;
        this.button        = (eventInitDict && eventInitDict.button) ? eventInitDict.button : 0;
        this.buttons       = (eventInitDict && eventInitDict.buttons) ? eventInitDict.buttons : 0;
        this.ctrlKey       = (eventInitDict && eventInitDict.ctrlKey) ? eventInitDict.ctrlKey : false;
        this.shiftKey      = (eventInitDict && eventInitDict.shiftKey) ? eventInitDict.shiftKey : false;
        this.altKey        = (eventInitDict && eventInitDict.altKey) ? eventInitDict.altKey : false;
        this.metaKey       = (eventInitDict && eventInitDict.metaKey) ? eventInitDict.metaKey : false;
    };

    MouseEvent.prototype = Object.create(UIEvent.UIEvent.prototype);

    Object.defineProperty(Window.Window.prototype, 'MouseEvent', {
        /*
        * @id MouseEventGet
        */
        get: function(){
            return MouseEvent;
        }
    });

    return {'MouseEvent': MouseEvent};

};

module.exports = initMouseEvent;