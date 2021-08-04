const registerWebworker = require('../../../../js/MessagePassing/webworker-promise/src/register');
const PromiseInfo = require('../../../../js/Promises/Promise');
const Promise = PromiseInfo.Promise;

console.log('Worker: running script')
// worker.js
registerWebworker.RegisterPromise(async (msg) => {
    console.log('Worker: received msg '+msg);
    op = msg;
    //handle postMessage
    return 'pong';
})
.operation('identity', async (message, emit) => {
    console.log('Worker: handling operation, message: '+message);
    return message;
});

console.log('Worker: finished running script')