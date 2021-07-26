const EventTarget = require('../../DOM/Events/EventTarget');
const MessageChannelInfo = require('../PostMessage/MessageChannel');
const SharedWorkerInfo   = require('./SharedWorker');

/*
* @id WorkerGlobalScope
*/
function WorkerGlobalScope(name, global, WorkerInfo){
    EventTarget.EventTarget.call(this);
    this.__name = name;

    Object.defineProperty(global, 'MessageChannel', {
        /*
        * @id DedicatedWorkerGlobalScopeMessageChannel
        */
        get: function(){
            return MessageChannelInfo.MessageChannel;
        }
    });

    Object.defineProperty(global, 'Worker', {
        /*
        * @id DedicatedWorkerGlobalScopeWorker
        */
        get: function(){
            return WorkerInfo.Worker;
        }
    });

    Object.defineProperty(global, 'SharedWorker', {
        /*
        * @id DedicatedWorkerGlobalScopeSharedWorker
        */
        get: function(){
            return SharedWorkerInfo.SharedWorker;
        }
    });

    Object.defineProperty(global, 'importScripts', {});
    Object.defineProperty(global, 'navigator', {});
    Object.defineProperty(global, 'btoa', {});
    Object.defineProperty(global, 'atob', {});
    Object.defineProperty(global, 'location', {});
    Object.defineProperty(global, 'close', {});
    Object.defineProperty(global, 'XMLHttpRequest', {});
    Object.defineProperty(global, 'WebSocket', {});
    Object.defineProperty(global, 'EventSource', {});
    Object.defineProperty(global, 'ApplicationCache', {});

    this.MessageChannel = global.MessageChannel;
    this.Worker         = global.Worker;
    this.SharedWorker   = global.SharedWorker;
    this.importScripts = global.importScripts;
    this.navigator = global.navigator;
    this.btoa = global.btoa;
    this.atob = global.atob;
    this.location = global.location;
    this.close = global.close;
    this.XMLHttpRequest = global.XMLHttpRequest;
    this.WebSocket = global.WebSocket;
    this.EventSource = global.EventSource;
    this.ApplicationCache = global.ApplicationCache;
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