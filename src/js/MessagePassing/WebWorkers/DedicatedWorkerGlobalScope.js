const WindowInfo = require('../../DOM/Events/Window');
/*
* @id DedicatedWorkerGlobalScope
*/
function DedicatedWorkerGlobalScope (global, name, parentWindowId) {
    Object.defineProperty(global, 'self', {
        /*
        * @id DedicatedWorkerSelf
        */
        get: function(){
            return global;
        }
    });
    Object.defineProperty(global, 'parent', {
        /*
        * @id DedicatedWorkerGlobalGetParent
        */
        get: function(){
            return WindowInfo.getParent(parentWindowId);
        }
    });
    Object.defineProperty(global, 'origin', {
        /*
        * @id DedicatedWorkerGlobalGetOrigin
        */
        get: function(){ return null; }
    });
    Object.defineProperty(global, 'addEventListener', {
        /*
        * @id DedicatedWorkerGlobalAddEventListener
        */
        get: function(){
            return this.__port.addEventListener.bind(this.__port);
        }
    });
    Object.defineProperty(global, 'onmessage', {
        /*
        * @id DedicatedWorkerGlobalScopeOnMessage
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
        * @id DedicatedWorkerGlobalScopeOnError
        */
        set: function(f){
            var window = WindowInfo.getInstance();
            window.onerror = f;
        }
    });
    Object.defineProperty(global, 'onmessageerror', {
        /*
        * @id DedicatedWorkerGlobalScopeOnMessageError
        */
        set: function(f){
            this.__port.addEventListener('messageerror', f);
        }
    });

    Object.defineProperty(global, 'postMessage', {
        /*
        * @id DedicatedWorkerGlobalScopePostMessage
        */
        get: function(){
            var port = this.__port;
            return port.postMessage.bind(port);
        }
    });
    Object.defineProperty(global, 'postMessageWindow', {
        /*
        * @id DedicatedWorkerGlobalScopePostMessageWindow
        */
        get: function(){
            var port = this.__port;
            return function(message, options) { port.postMessageWindow(message, options)};
        }
    });
    return global;
}

exports.DedicatedWorkerGlobalScope = DedicatedWorkerGlobalScope;