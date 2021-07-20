const MPSemantics       = require('../../MessagePassing/Common/MPSemantics');
const MessagePort       = require('../../MessagePassing/PostMessage/MessagePort');
const HTMLElement       = require('./HTMLElement');
const Window            = require('./Window');

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
    }
});

exports.HTMLIFrameElement = HTMLIFrameElement;