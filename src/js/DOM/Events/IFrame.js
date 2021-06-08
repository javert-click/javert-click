const MPSemantics       = require('../../../js/MessagePassing/Common/MPSemantics');
const MessagePort       = require('../../../js/MessagePassing/PostMessage/MessagePort');

var MPSem = MPSemantics.getMPSemanticsInstance();

function IFrame(url, window){
   this.parentNode = window;
   window.iframes.push(this);
   var i = (window.iframes.length-1)+"";
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
        return window.iframes[i];
    }
   });
   // 7. Create a new MessagePort object whose owner is outside settings. Let this be the outside port
   var outsidePort = new MessagePort.PublicMessagePort();
   outsidePort.__Enabled = true;
   // 8. Associate the outside port with worker
   this.__port = outsidePort;
   this.__port.targetWindow = window;
   this.__id = MPSem.create(url, "__setupConf", outsidePort.__id, false);
}

IFrame.prototype.postMessage = function(message, targetOrigin, transfer){
    this.__port.postMessageWindow(message, targetOrigin, transfer);
}

IFrame.prototype.getTheParent = function (event){
    console.log('getting iframes parent');
    return this.parentNode;
}

exports.IFrame = IFrame;