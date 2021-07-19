const WindowInfo = require('../../DOM/Events/Window');
/*
* @id IFrameGlobalScope
*/
function IFrameGlobalScope (global, mainWindowId, proxyIFrameId) {
    Object.defineProperty(global, 'window', {
        /*
        * @id IFrameSelf
        */
        get: function(){
            return WindowInfo.getInstance(proxyIFrameId);
        }
    });
    Object.defineProperty(global, 'self', {
        /*
        * @id IFrameSelf
        */
        get: function(){
            return global;
        }
    });
    Object.defineProperty(global, 'parent', {
        /*
        * @id IFrameGlobalGetParent
        */
        get: function(){
            var parent = WindowInfo.getParent(mainWindowId);
            return parent;
        }
    });
    Object.defineProperty(global, 'origin', {
        /*
        * @id IFrameGetOrigin
        */
        get: function(){ return null; }
    });
    Object.defineProperty(global, 'addEventListener', {
        /*
        * @id IFrameGlobalAddEventListener
        */
        get: function(){
            return this.__port.addEventListener.bind(this.__port);
        }
    });
    Object.defineProperty(global, 'onmessage', {
        /*
        * @id IFrameOnMessage
        */
        set: function(f){
            this.__port.__Enabled = true;
            this.__port.addEventListener('message', f);
            var window = WindowInfo.getInstance();
            window.addEventListener('message', f);
        }
    });
    Object.defineProperty(global, 'onerror', {
        /*
        * @id IFrameOnError
        */
        set: function(f){
            var window = WindowInfo.getInstance(proxyIFrameId);
            window.onerror = f;
        }
    });
    Object.defineProperty(global, 'onmessageerror', {
        /*
        * @id IFrameOnMessageError
        */
        set: function(f){
            this.__port.addEventListener('messageerror', f);
            var window = WindowInfo.getInstance();
            window.addEventListener('messageerror', f);
        }
    });

    Object.defineProperty(global, 'postMessage', {
        /*
        * @id IFrameScopePostMessage
        */
        get: function(){
            var port = this.__port;
            return port.postMessage.bind(port);
        }
    });
    Object.defineProperty(global, 'postMessageWindow', {
        /*
        * @id IFrameScopePostMessageWindow
        */
        get: function(){
            var port = this.__port;
            return function(message, options) { port.postMessageWindow(message, options)};
        }
    });
    return global;
}

exports.IFrameGlobalScope = IFrameGlobalScope;