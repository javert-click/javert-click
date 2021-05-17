/********************/
/* INTERFACE WINDOW */
/********************/

const EventTarget = require('./EventTarget');

    /*
* @id Window
*/
var Window = function(){
    EventTarget.EventTarget.call(this);
    this.document = null;
    this.timeStamp = (new Date()).getTime();
    this.event = undefined;
    this.__onerror = null;
    this.window = this;
    this.parent = null;
    this.opener = null;

    this.outerHeight = 820;
};

Window.prototype = Object.create(EventTarget.EventTarget.prototype);

Object.defineProperty(Window.prototype, 'onerror', {
    /*
    * @id WindowOnErrorSet
    */
    set: function(f){
        this.addEventListener("error", f);
        this.__onerror = f;
    },

    /*
    * @id WindowOnErrorGet
    */
    get: function(){
        return this.__onerror;
    }
});

/*
* @id WindowGetComputedStyle
*/
Window.prototype.getComputedStyle = function(elem){
    return elem.style;
};

Object.defineProperty(Window.prototype, 'outer-height', {
    get: function(){
        return this.outerHeight;
    }
});

Window.prototype.setTimeout = function (callback, timeout) {
    return callback ();
}

Window.prototype.clone = function () {
    var copy = new Window();
    copy.document = this.document;
    copy.timeStamp = this.timeStamp;
    copy.__onerror = this.__onerror;
    copy.paent = this.parent;
    copy.opener = this.opener;
    copy.outerHeight = this.outerHeight;
    return copy;
}

var windowInstance;

function getInstance(){
    if (!windowInstance){
        windowInstance = new Window();
    }
    return windowInstance;
}

exports.Window = Window;
exports.getInstance = getInstance;



