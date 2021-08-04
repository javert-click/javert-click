const WebworkerPromiseInfo = require('../../../js/MessagePassing/webworker-promise/src/index');
const WebworkerPromise = WebworkerPromiseInfo.WebworkerPromise;
const WorkerInfo = require('../../../js/MessagePassing/WebWorkers/Worker');
const Worker = WorkerInfo.Worker;
const PromiseInfo = require('../../../js/Promises/Promise');
const Promise = PromiseInfo.Promise;

console.log('MAIN: creating worker');

var msg = symb(msg);
var typMsg = typeof msg === 'object';
JavertAssume(typMsg);

const worker = new WebworkerPromise(new Worker('operationsworker.js'));

console.log('Worker created');

// main.js
worker.exec('identity', msg)
.then(
  (response => {
    const prop = msg === response.PromiseResult;
    console.log('Got response from op: '+response.PromiseResult)
    JavertAssert(prop);
  })
);