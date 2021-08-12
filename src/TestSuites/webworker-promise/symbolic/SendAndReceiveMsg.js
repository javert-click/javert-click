const WebworkerPromiseInfo = require('../../../js/MessagePassing/webworker-promise/src/index');
const WebworkerPromise = WebworkerPromiseInfo.WebworkerPromise;
const WorkerInfo = require('../../../js/MessagePassing/WebWorkers/Worker');
const Worker = WorkerInfo.Worker;

console.log('MAIN: creating worker');

var msg = symb(msg);
var isobj = typeof msg === 'object';
JavertAssume (isobj);

const worker = new WebworkerPromise(new Worker('basicworker.js'));

console.log('MAIN: posting message to worker');
worker.postMessage(msg)
.then((response) => {
    console.log('MAIN: Got message: '+response);
    var responseIsEqual = response === msg;
    JavertAssert (responseIsEqual);
})
.catch(err => {
    console.log('MAIN: Got error');
    JavertAssert(false)
});

/*
Failing Model:
[(#msg: null)]

real	7m5.494s
user	6m48.629s
sys	0m6.880s
*/

console.log('MAIN: finsihed executing script')