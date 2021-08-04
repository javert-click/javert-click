// worker.js
console.log('Worker: executing script')
const registerWebworker = require('../../../../js/MessagePassing/webworker-promise/src/register');

registerWebworker.RegisterPromise(function (message) {
    console.log('Worker: got message '+message);
    throw new Error('myException!');
});
console.log('Worker: finished executing script')