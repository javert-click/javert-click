const TinyEmitter = require('./tiny-emitter');

const MESSAGE_RESULT = 0;
const MESSAGE_EVENT = 1;

const RESULT_ERROR = 0;
const RESULT_SUCCESS = 1;

const DEFAULT_HANDLER = 'main';

const isPromise = o => typeof o === 'object' && typeof o.then === 'function' && typeof o.catch === 'function';

/*
* @id RegisterPromise
*/
function RegisterPromise(fn) {
  const handlers = {};
  handlers[DEFAULT_HANDLER] = fn;
  const self = executeJSILProc("JSILGetGlobal");
  const sendPostMessage = self.postMessage//.bind(self);

  function WorkerRegister(){
    TinyEmitter.TinyEmitter.call(this);
  }  

  WorkerRegister.prototype = Object.create(TinyEmitter.TinyEmitter.prototype);
    
  WorkerRegister.prototype.emit = function(eventName, xargs) {
    if (xargs.length == 1 && xargs[0] instanceof TransferableResponse) {
      sendPostMessage({eventName, args: xargs}, xargs[0].transferable);
    } else {
      sendPostMessage({eventName, args: xargs});
    }
    return this;
  }

  WorkerRegister.prototype.emitLocally = function(eventName, xargs) {
    TinyEmitter.TinyEmitter.prototype.emit.call(this, eventName, xargs);
  }

  WorkerRegister.prototype.operation = function(name, handler) {
    handlers[name] = handler;
    return this;
  }

  const server = new WorkerRegister();

  /*
  * @id WorkerRegisterRun
  */
  const run = (xargs) => {
    const messageId = xargs[0];
    const payload = xargs[1]; 
    const handlerName = xargs[2];

    const onSuccess = (result) => {
      if(result && result instanceof TransferableResponse) {
        sendResult(messageId, RESULT_SUCCESS, result.payload, result.transferable);
      }
      else {
        sendResult(messageId, RESULT_SUCCESS, result);
      }
    };

    const onError = (e) => {
      sendResult(messageId, RESULT_ERROR, {
        message: e.message,
        stack: e.stack
      });
    };

    try {
      const result = runFn(messageId, payload, handlerName);
      if(isPromise(result)) {
        result.then(onSuccess).catch(onError);
      } else {
        onSuccess(result);
      }
    } catch (e) {
      onError(e);
    }
  };

  /*
  * @id WorkerRegisterRunFn
  */
  const runFn = (messageId, payload, handlerName) =>  {
    const handler = handlers[handlerName || DEFAULT_HANDLER];
    if(!handler)
      throw new Error(`Not found handler for this request`);

    return handler(payload, sendEvent(messageId))
    //return handler(payload, sendEvent.bind(null, messageId))
  };

  const sendResult = (messageId, success, payload, transferable) => {
    transferable = transferable || [];
    sendPostMessage([MESSAGE_RESULT, messageId, success, payload], transferable);
  };

  /*
  * @id WorkerRegisterSendEvent
  */
  function sendEvent(messageId){
    return (eventName, payload) => {
    if(!eventName)
      throw new Error('eventName is required');

    if(typeof eventName !== 'string')
      throw new Error('eventName should be string');

    sendPostMessage([MESSAGE_EVENT, messageId, eventName, payload]);
  }};

  //TODOMP: addEventListener was being used here, but according to standard seems correct to use onmessage!
  self.onmessage = (e) => {
    var data = e.data;
    if(Array.isArray(data)) {
      run(data);
    } else if(data && data.eventName) {
      server.emitLocally(data.eventName, data.args);
    }
  };

  return server;
}

function TransferableResponse (payload, transferable){
  this.payload = payload;
  this.transferable = transferable;
}

exports.RegisterPromise = RegisterPromise;
exports.TransferableResponse = TransferableResponse;