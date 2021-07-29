const EventTarget        = require('../../DOM/Events/EventTarget');
const MessageChannelInfo = require('../PostMessage/MessageChannel');
const SharedWorkerInfo   = require('./SharedWorker');
const DOMException       = require('../../DOM/Common/DOMException');
const MessageEventInfo   = require('../../DOM/Events/MessageEvent');

/*
* @id WorkerGlobalScope
*/
function WorkerGlobalScope(name, global, WorkerInfo){
    EventTarget.EventTarget.call(this);
    this.__name = name;

    Object.defineProperty(global, 'MessageChannel', {
        /*
        * @id WorkerGlobalScopeMessageChannel
        */
        get: function(){
            return MessageChannelInfo.MessageChannel;
        }
    });

    Object.defineProperty(global, 'Worker', {
        /*
        * @id WorkerGlobalScopeWorker
        */
        get: function(){
            return WorkerInfo.Worker;
        }
    });

    Object.defineProperty(global, 'SharedWorker', {
        /*
        * @id WorkerGlobalScopeSharedWorker
        */
        get: function(){
            return SharedWorkerInfo.SharedWorker;
        }
    });

    Object.defineProperty(global, 'WorkerGlobalScope', {
        /*
        * @id WorkerGlobalScopeWorkerGlobalScope
        */
        get: function(){
            return WorkerGlobalScope;
        }
    });

    Object.defineProperty(global, 'MessageEvent', {
        /*
        * @id WorkerGlobalScopeMessageEvent
        */
        get: function(){
            return this.__MessageEvent ? this.__MessageEvent : MessageEventInfo.MessageEvent;
        },
        set: function(v){
            this.__MessageEvent = v;
        }
    });

    function replicatePropInScope(xsc, prop){
        function getter(){
            return global[prop];
        }
        function setter(v){
            global[prop] = v;
        }
        var desc = Object.getOwnPropertyDescriptor(global, prop);
        if(desc.get && !desc.set){
            Object.defineProperty(xsc, prop, {
                get: getter
            });
        } else if(desc.get && desc.set){
            Object.defineProperty(xsc, prop, {
                get: getter,
                set: setter
            });
        }
    }

    Object.defineProperty(global, 'importScripts', {});
    Object.defineProperty(global, 'navigator', {});
    Object.defineProperty(global, 'btoa', {
        get: function(){
            return function(){};
        }
    });
    Object.defineProperty(global, 'atob', {
        get: function(){
            return function(){};
        }
    });
    Object.defineProperty(global, 'location', {});
    Object.defineProperty(global, 'close', {});
    Object.defineProperty(global, 'XMLHttpRequest', {});
    Object.defineProperty(global, 'WebSocket', {});
    Object.defineProperty(global, 'EventSource', {});

    Object.defineProperty(this, 'WorkerNavigator', {});
    Object.defineProperty(this, 'WorkerLocation', {});
    Object.defineProperty(this, 'ImageData', {});
    Object.defineProperty(this, 'ImageBitmap', {});
    Object.defineProperty(this, 'CanvasGradient', {});
    Object.defineProperty(this, 'CanvasPattern', {});
    Object.defineProperty(this, 'CanvasPath', {});
    Object.defineProperty(this, 'TextMetrics', {});
    Object.defineProperty(this, 'Path2D', {});
    Object.defineProperty(this, 'PromiseRejectionEvent', {});
    Object.defineProperty(this, 'CloseEvent', {});
    Object.defineProperty(this, 'BroadcastChannel', {});
    Object.defineProperty(this, 'ArrayBuffer', {});
    Object.defineProperty(this, 'Int8Array', {});
    Object.defineProperty(this, 'Uint8Array', {});
    Object.defineProperty(this, 'Uint8ClampedArray', {});
    Object.defineProperty(this, 'Int16Array', {});
    Object.defineProperty(this, 'Uint16Array', {});
    Object.defineProperty(this, 'Int32Array', {});
    Object.defineProperty(this, 'Uint32Array', {});
    Object.defineProperty(this, 'Float32Array', {});
    Object.defineProperty(this, 'Float64Array', {});
    Object.defineProperty(this, 'DataView', {});
    Object.defineProperty(this, 'XMLHttpRequestEventTarget', {});
    Object.defineProperty(this, 'XMLHttpRequestUpload', {});
    Object.defineProperty(this, 'ProgressEvent', {});
    Object.defineProperty(this, 'FormData', {});
    Object.defineProperty(this, 'URL', {});
    Object.defineProperty(this, 'URLSearchParams', {});
    Object.defineProperty(this, 'File', {});
    Object.defineProperty(this, 'Blob', {});
    Object.defineProperty(this, 'FileList', {});
    Object.defineProperty(this, 'FileReader', {});
    Object.defineProperty(this, 'FileReaderSync', {});
    Object.defineProperty(this, 'EventTarget', {
        get: function(){
            return EventTarget.EventTarget;
        }
    });
    Object.defineProperty(this, 'ErrorEvent', {});
    Object.defineProperty(this, 'Event', {});
    Object.defineProperty(this, 'CustomEvent', {});
    Object.defineProperty(this, 'DOMException', {
        get: function(){
            return DOMException.DOMException;
        }
    });
    Object.defineProperty(this, 'ReadableStream', {});
    Object.defineProperty(this, 'WritableStream', {});
    Object.defineProperty(this, 'ByteLengthQueuingStrategy', {});
    Object.defineProperty(this, 'CountQueuingStrategy', {});
    Object.defineProperty(this, 'IDBRequest', {});
    Object.defineProperty(this, 'IDBOpenDBRequest', {});
    Object.defineProperty(this, 'IDBVersionChangeEvent', {});
    Object.defineProperty(this, 'IDBFactory', {});
    Object.defineProperty(this, 'IDBDatabase', {});
    Object.defineProperty(this, 'IDBObjectStore', {});
    Object.defineProperty(this, 'IDBIndex', {});
    Object.defineProperty(this, 'IDBKeyRange', {});
    Object.defineProperty(this, 'IDBCursor', {});
    Object.defineProperty(this, 'IDBCursorWithValue', {});
    Object.defineProperty(this, 'IDBTransaction', {});


    replicatePropInScope(this, 'MessageChannel');
    replicatePropInScope(this, 'Worker');
    replicatePropInScope(this, 'SharedWorker');
    replicatePropInScope(this, 'WorkerGlobalScope');
    replicatePropInScope(this, 'importScripts');
    replicatePropInScope(this, 'navigator');
    replicatePropInScope(this, 'btoa');
    replicatePropInScope(this, 'atob');
    replicatePropInScope(this, 'location');
    replicatePropInScope(this, 'close');
    replicatePropInScope(this, 'XMLHttpRequest');
    replicatePropInScope(this, 'WebSocket');
    replicatePropInScope(this, 'EventSource');
    replicatePropInScope(this, 'MessagePort');
    replicatePropInScope(this, 'MessageEvent');


    this.setTimeout = global.setTimeout;
    this.clearTimeout = global.clearTimeout;
    this.setInterval = global.setInterval;
    this.clearInterval = global.clearInterval;

}

// TODO: this interface has a lot more than this.

WorkerGlobalScope.prototype = Object.create(EventTarget.EventTarget.prototype);

Object.defineProperty(WorkerGlobalScope.prototype, 'name', {
    get: function(){
        return this.__name;
    }
})

exports.WorkerGlobalScope = WorkerGlobalScope;