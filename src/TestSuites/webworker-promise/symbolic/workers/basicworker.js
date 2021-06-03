// worker.js
const registerWebworker = require('../../../../js/MessagePassing/webworker-promise/src/register');
const PromiseInfo = require('../../../../js/Promises/Promise');
const Promise = PromiseInfo.Promise;
registerWebworker.RegisterPromise(
/*
* @id workerhandler
*/
(message, emit) => {
  //message - ping
  console.log('WORKER: got msg: '+message);
  debugger;
  return message;
});
console.log('WORKER: Finished executing script');