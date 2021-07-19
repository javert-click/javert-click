/********************/
/* INTERFACE WINDOW */
/********************/

const EventTarget = require('./EventTarget');
const DOMException = require('../Common/DOMException');

/*
* @id Window
*/
var Window = function(id, parent){
    EventTarget.EventTarget.call(this);
    if (id) {
      this.__id = id;
    }else{
      Window.counter = (Window.counter || 0) + 1; 
      //this.__id = Window.counter; 
      this.__id = Math.random();
    }
    this.document = null;
    this.timeStamp = (new Date()).getTime();
    this.event = undefined;
    this.__onerror = null;
    this.window = this;
    this.parent = parent;
    this.opener = null;

    this.outerHeight = 820;
    this.iframes = this;
    this.__iframes_array = [];
    Window.prototype.windows.push(this);
};

Window.prototype = Object.create(EventTarget.EventTarget.prototype);

Window.prototype.windows = [];

Object.defineProperty(Window.prototype, "DOMException", {
    get: function(){
        return DOMException.DOMException;
    }
})

Object.defineProperty(Window.prototype, 'onmessage', {
    /*
    * @id WindowOnMessage
    */
    set: function(f){
        this.addEventListener('message', f);
    }
});

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

/*Window.prototype.getTheParent = function(){
    return this.parent;
}*/

/*
* @id WindowCreateCommunicationPoint
*/
Window.prototype.createCommunicationPoint = function(MessagePort, url, MPSem){
    var outsidePort = new MessagePort();
    outsidePort.__Enabled = true;
    this.__port = outsidePort;
    this.__port.targetWindow = this;
    this.src = url;
    if(url) this.__id = MPSem.create(url, "__setupIFrameContext", [outsidePort.__id, this.parent.__id, this.__id]);
}

var windowInstance;

function getInstance(id){
    if (!windowInstance){
        windowInstance = new Window(id);
    }
    return windowInstance;
}

/* 
* @id WindowGetParent
*/
function getParent(id){
    var window = getInstance();
    if(window.parent){
        return window.parent;
    }else{
       var parent = new Window(id);
       window.parent = parent;
       return parent;
    }
}

exports.Window = Window;
exports.getInstance = getInstance;
exports.getParent   = getParent;



