const MPSemantics       = require('../../MessagePassing/Common/MPSemantics');
const MessagePort       = require('../../MessagePassing/WebMessaging/MessagePort');
const HTMLElement       = require('./HTMLElement');
const Window            = require('./Window');
const Event             = require('./Event');

var MPSem = MPSemantics.getMPSemanticsInstance();

/*
* @id HTMLIFrameElement
*/
function HTMLIFrameElement(name, document){
   HTMLElement.HTMLElement.call(this, name, document);
   //this.parentNode = window;
   var window = Window.getInstance();
   var contentWindow = new Window.Window(undefined, window);
   this.contentWindow = contentWindow;
   this.contentWindow.document = document;
   window.__iframes_array.push(this.contentWindow);
   var i = (window.__iframes_array.length-1)+"";
   Object.defineProperty(window, i, {
    /*
    * @id WindowSetIFrame
    */
    set: function(f){
        throw new Error("IFrame is readonly");
    },

    /*
    * @id WindowGetIFrame
    */
    get: function(){
        return window.__iframes_array[i];
    }
   });
}

HTMLIFrameElement.prototype = Object.create(HTMLElement.HTMLElement.prototype);

Object.defineProperty(HTMLIFrameElement.prototype, "src", {
    set: function(url){
        this.contentWindow.createCommunicationPoint(MessagePort.PublicMessagePort, url, MPSem);
        var loadEvent = new Event.Event('load');
        //console.log('Iframe.src: going to dispatch load event');
        this.dispatchEvent(loadEvent);
    }
});

Object.defineProperty(HTMLIFrameElement.prototype, "onload", {
    set: function(f){
        this.addEventListener('load', f);
    }
});

exports.HTMLIFrameElement = HTMLIFrameElement;