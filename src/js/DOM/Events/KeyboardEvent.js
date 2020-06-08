//const UIEvent = require('./UIEvent');
//const Window  = require('./Window');

/*
* @id initKeyboardEvent
*/
var initKeyboardEvent = function(UIEvent, Window){
    
    /*
    * @id KeyboardEvent
    */
    var KeyboardEvent = function(type, keyboardEventInit){
        UIEvent.UIEvent.call(this, type, keyboardEventInit);
        //this.char          = "";
        //this.modifiers        = (keyboardEventInit && keyboardEventInit.mofidiers) ? keyboardEventInit.modifiers : false;
        this.view          = (keyboardEventInit && keyboardEventInit.view) ? keyboardEventInit.view : null;
        this.repeat        = (keyboardEventInit && keyboardEventInit.repeat) ? keyboardEventInit.repeat : false;
        this.location      = (keyboardEventInit && keyboardEventInit.location) ? keyboardEventInit.location : 0;
        this.key           = (keyboardEventInit && keyboardEventInit.key) ? keyboardEventInit.key : "";
        this.code          = (keyboardEventInit && keyboardEventInit.code) ? keyboardEventInit.code : "";
        this.ctrlKey       = (keyboardEventInit && keyboardEventInit.ctrlKey) ? keyboardEventInit.ctrlKey : false;
        this.shiftKey      = (keyboardEventInit && keyboardEventInit.shiftKey) ? keyboardEventInit.shiftKey : false;
        this.altKey        = (keyboardEventInit && keyboardEventInit.altKey) ? keyboardEventInit.altKey : false;
        this.metaKey       = (keyboardEventInit && keyboardEventInit.metaKey) ? keyboardEventInit.metaKey : false;
        this.isComposing   = (keyboardEventInit && keyboardEventInit.isComposing) ? keyboardEventInit.isComposing : false;
        //These properties (charCode, keyCode and which) do not appear in spec, but the tests required!
        this.charCode      = (keyboardEventInit && keyboardEventInit.charCode) ? keyboardEventInit.charCode : 0;
        this.keyCode       = (keyboardEventInit && keyboardEventInit.keyCode) ? keyboardEventInit.keyCode : 0;
        this.which         = (keyboardEventInit && keyboardEventInit.which) ? keyboardEventInit.which : 0;
    };

    KeyboardEvent.prototype = Object.create(UIEvent.UIEvent.prototype);

    /*
    * @id KeyboardEventInitKeyboardEvent
    */
    KeyboardEvent.prototype.initKeyboardEvent = function(type, bubbles, cancelable, view, char, key, location, modifiers, repeat){
        this.initEvent(type, bubbles, cancelable);
        this.view = view;
        this.char = char;
        this.key = key;
        this.location = location;
        this.repeat = repeat;
        this.modifiers = modifiers;
    };

    Object.defineProperty(Window.Window.prototype, 'KeyboardEvent', {
        /*
        * @id WindowKeyboardEventGet
        */
        get: function(){
            return KeyboardEvent;
        }
    });

    return {'KeyboardEvent': KeyboardEvent};
};


module.exports = initKeyboardEvent;

