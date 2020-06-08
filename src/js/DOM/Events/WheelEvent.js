/*************************/
/* INTERFACE WHEEL EVENT */
/*************************/

/*
* @id initWheelEvent
*/
function initWheelEvent(MouseEvent, Window){

    /*
    * @id WheelEvent
    */
    var WheelEvent = function(type, eventInitDict){
        MouseEvent.MouseEvent.call(this, type, eventInitDict);
        this.deltaX    = eventInitDict && eventInitDict.deltaX ? eventInitDict.deltaX : 0;
        this.deltaY    = eventInitDict && eventInitDict.deltaY ? eventInitDict.deltaY : 0;
        this.deltaZ    = eventInitDict && eventInitDict.deltaZ ? eventInitDict.deltaZ : 0;
        this.deltaMode = eventInitDict && eventInitDict.deltaMode ? eventInitDict.deltaMode : 0;
    };

    WheelEvent.prototype = Object.create(MouseEvent.MouseEvent.prototype);

    Object.defineProperty(Window.Window.prototype, 'WheelEvent', {
        /*
        * @id WindowWheelEventGet
        */
        get: function(){
            return WheelEvent;
        }
    });

    return {'WheelEvent': WheelEvent};
} 

module.exports = initWheelEvent;