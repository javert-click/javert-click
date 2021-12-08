const EventTarget        = require('../../DOM/Events/EventTarget');
const MessageChannelInfo = require('../WebMessaging/MessageChannel');
const SharedWorkerInfo   = require('./SharedWorker');
const DOMException       = require('../../DOM/Common/DOMException');
const MessageEventInfo   = require('../../DOM/Events/MessageEvent');
const EventInfo          = require('../../DOM/Events/Event');
const ErrorEventInfo     = require('../../DOM/Events/ErrEvent');
const MPSemantics        = require('../Common/MPSemantics');
const __location         = require('../WebMessaging/Location');

/*
* @id WorkerGlobalScope
*/
function WorkerGlobalScope(options, global, WorkerInfo){
    EventTarget.EventTarget.call(this);
    global.__name = options.name;

    Object.defineProperty(global, 'MessageChannel', {
        /*
        * @id WorkerGlobalScopeMessageChannel
        */
        get: function(){
            return MessageChannelInfo.MessageChannel;
        }
    });

    Object.defineProperty(global, 'MPSemantics', {
        /*
        * @id WorkerGlobalScopeMPSemantics
        */
        get: function(){
            return MPSemantics;
        }
    });

    

    Object.defineProperty(global, 'ErrorEvent', {
        /*
        * @id WorkerGlobalScopeErrorEvent
        */
        get: function(){
            return ErrorEventInfo.ErrorEvent;
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

    Object.defineProperty(global, 'Event', {
        /*
        * @id WorkerGlobalScopeEvent
        */
        get: function(){
            return this.__Event ? this.__Event : EventInfo.Event;
        },
        set: function(v){
            this.__Event = v;
        }
    });

    Object.defineProperty(global, 'name', {
        value: global.__name,
        writable: true,
        configurable: true,
        enumerable: true
        /*get: function(){
            return global.__name;
        },
        set: function(newName){
            global.__name = newName;
        }*/
    });

    Object.defineProperty(this, 'name', {
        value: global.__name,
        writable: true,
        configurable: true,
        enumerable: true
        /*get: function(){
            return global.__name;
        },
        set: function(newName){
            global.__name = newName;
        }*/
    });

    function replicatePropInScope(xsc, prop){
        function getter(){
            return global[prop];
        }
        function setter(v){
            global[prop] = v;
        }
        var desc = Object.getOwnPropertyDescriptor(global, prop);
        if(desc.get && desc.set){
            Object.defineProperty(xsc, prop, {
                get: getter,
                set: setter
            });
        } else {
            Object.defineProperty(xsc, prop, {
                get: getter
            });
        }
    }

    Object.defineProperty(global, 'importScripts', {
        get: function(){
            return function(){}
        }
    });
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
    //Object.defineProperty(global, 'location', {});
    Object.defineProperty(global, 'location', {
        get: function(){
            return {
                protocol: __location.protocol,
                host: __location.host,
                origin: __location.origin,
                href: options.href,
                pathname: options.pathname,
                hash: options.hash,
                search: options.search,
                port: __location.port,
                hostname: __location.hostname,
                toString: function(){ return options.href }
            };
        }
    });
    Object.defineProperty(global, 'close', {
        get: function(){
            console.log('Close called, mpsem? '+global.MPSemantics);
            return function(){
                __ES__schedule(global.MPSemantics.getMPSemanticsInstance().close);
            }
        }
    });
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

    /*Object.defineProperty(import.meta, 'url', {
        get: function(){
            return options.url;
        }/*,
        set: function(f){
            global.onconnect = f;
        }*/
    //});


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
    //replicatePropInScope(this, 'MessagePort');
    this.MessagePort = global.MessagePort;
    console.log('replicated MessagePort? '+this.MessagePort);
    replicatePropInScope(this, 'MessageEvent');
    replicatePropInScope(this, 'Event');
    replicatePropInScope(this, 'ErrorEvent');
    //replicatePropInScope(this, 'name');


    this.setTimeout = global.setTimeout;
    this.clearTimeout = global.clearTimeout;
    this.setInterval = global.setInterval;
    this.clearInterval = global.clearInterval;

}

// TODO: this interface has a lot more than this.

WorkerGlobalScope.prototype = Object.create(EventTarget.EventTarget.prototype);

exports.WorkerGlobalScope = WorkerGlobalScope;