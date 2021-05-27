const TinyEmitter = require('./tiny-emitter');
const Map = require('../../../Utils/Map');
const Promise = require('../../../Promises/Promise');

const MESSAGE_RESULT = 0;
const MESSAGE_EVENT = 1;

const RESULT_ERROR = 0;
const RESULT_SUCCESS = 1;

/**
* @id WebworkerPromise
*/
function WebworkerPromise(worker){
  TinyEmitter.TinyEmitter.call(this);
  WebworkerPromise.counter = (WebworkerPromise.counter || 0) + 1; 
  this._messageId = 1;
  this._messages = new Map.Map();

  this._worker = worker;
  this._worker.onmessage = this._onMessage(this);
  //this._id = Math.ceil(Math.random() * 10000000);
  this._id = WebworkerPromise.counter;
} 

WebworkerPromise.prototype = Object.create(TinyEmitter.TinyEmitter.prototype);


WebworkerPromise.prototype.terminate = function() {
  this._worker.terminate();
}

/**
* @id WebworkerPromiseoIsFree
*/
WebworkerPromise.prototype.isFree = function() {
  return this._messages.size === 0;
}

/**
* @id WebworkerPromisejobsLength
*/
WebworkerPromise.prototype.jobsLength = function() {
  return this._messages.size;
}

/**
* @id WebworkerPromiseExec
*/
WebworkerPromise.prototype.exec = function(operationName, data, transferable, onEvent) {
  data = data || null;
  transferable = transferable || [];
  return new Promise.Promise((res, rej) => {
    const messageId = this._messageId++;
    this._messages.set(messageId, [res, rej, onEvent]);
    this._worker.postMessage([messageId, data, operationName], transferable || []);
  });
}

/**
* @id WebworkerPromisePostMessage
*/
WebworkerPromise.prototype.postMessage = function(data, transferable, onEvent) {
  data = data || null;
  transferable = transferable || [];
  var vthis = this;
  return new Promise.Promise((res, rej) => {
    const messageId = vthis._messageId++;
    vthis._messages.set(messageId, [res, rej, onEvent]);
    vthis._worker.postMessage([messageId, data], transferable || []);
  });
}

/**
* @id WebworkerPromiseEmit
*/
WebworkerPromise.prototype.emit = function() {
  var eventName = arguments[0][0];
  var realArgs = arguments[0].slice(1);
  this._worker.postMessage({eventName, realArgs});
}

/**
* @id WebworkerPromiseOnMessage
*/
WebworkerPromise.prototype._onMessage = function(vthis) {
  return function(e){
    //if we got usual event, just emit it locally
    if(!Array.isArray(e.data) && e.data.eventName) {
      return TinyEmitter.TinyEmitter.prototype.emit.call(vthis, e.data.eventName, e.data.args);
    }
    //const dataarr = e.data;
    var type = e.data[0];
    var argsv = e.data;
    argsv.shift(); 

    if(type === MESSAGE_EVENT)
      vthis._onEvent(argsv);
    else if(type === MESSAGE_RESULT)
      vthis._onResult(argsv);
    else
      throw new Error(`Wrong message type '${type}'`);
  }
}

/**
* @id WebworkerPromiseOnResult
*/
WebworkerPromise.prototype._onResult = function(argslist) {
  var messageId = argslist[0]; 
  var success = argslist[1]
  var payload = argslist[2];
  const mdata = this._messages.get(messageId);
  const res = mdata[0];
  const rej = mdata[1];
  this._messages.delete(messageId);

  return success === RESULT_SUCCESS ? res(payload) : rej(payload);
}

/**
* @id WebworkerPromiseOnEvent
*/
WebworkerPromise.prototype._onEvent = function(argslist) {
  var messageId = argslist[0]; 
  var eventName = argslist[1]
  var data = argslist[2];
  const mdata = this._messages.get(messageId);
  const onEvent = mdata[2];
  if(onEvent) {
    onEvent(eventName, data);
  }
}

exports.WebworkerPromise = WebworkerPromise;
