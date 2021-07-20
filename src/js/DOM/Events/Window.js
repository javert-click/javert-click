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
    if (id !== undefined) {
      this.__id = id;
    }else{
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
    //console.log('Adding window of id '+this.__id+' to prototype ');
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
    windowInstance.__port = outsidePort;
    this.__port = outsidePort;
    //this.__port.targetWindow = this;
    this.src = url;
    //console.log('createCommunicationPoint, parentId: '+this.parent.__id+', this.id: '+this.__id);
    if(url) MPSem.create(url, "__setupIFrameContext", [outsidePort.__id, this.parent.__id, this.__id]);
}

var windowInstance;

/*
* @id WindowGetInstance
*/
function getInstance(id){
    if(id){
        var instance = Window.prototype.windows.find((w) => {return w.__id === id});
        if(!instance){
          instance = new Window(id);
        }
        return instance;
    } else {
        if (!windowInstance){
          windowInstance = new Window(id);
        }
        return windowInstance;
    }
}

/*
* @id WindowSetInstance
*/
function setInstance(id){
    var w = Window.prototype.windows.find((w) => { return w.__id === id });
    if(w !== undefined) windowInstance = w;
}

/* 
* @id WindowGetParent
*/
function getParent(id, parentId){
    var curr = getInstance(id);
    if(curr.parent){
        return curr.parent;
    }else{
       var parent = new Window(parentId);
       curr.parent = parent;
       return parent;
    }
}

exports.Window = Window;
exports.getInstance = getInstance;
exports.setInstance = setInstance;
exports.getParent   = getParent;



