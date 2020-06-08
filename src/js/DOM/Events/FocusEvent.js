/*************************/
/* INTERFACE FOCUS EVENT */
/*************************/

//const UIEvent     = require('./UIEvent');
//const UIEventInit = UIEvent.UIEventInit;
//const Window    = require('./Window');

/*
* @id initFocusEvent
*/
var initFocusEvent = function(UIEvent, Window){

    /*
    * @id FocusEvent
    */
    var FocusEvent = function(type, focuseEventInitDict){
        UIEvent.UIEvent.call(this, type, focuseEventInitDict);
        if(focuseEventInitDict && focuseEventInitDict.relatedTarget){
            this.relatedTarget = focuseEventInitDict.relatedTarget
        }else{
            this.relatedTarget = null;
        }
    };

    FocusEvent.prototype = Object.create(UIEvent.UIEvent.prototype);

    Object.defineProperty(Window.Window.prototype, 'FocusEvent', {
        /*
        * @id WindowFocusEventGet
        */
        get: function(){
            return FocusEvent;
        }
    });

    return {'FocusEvent': FocusEvent};
};



module.exports = initFocusEvent;