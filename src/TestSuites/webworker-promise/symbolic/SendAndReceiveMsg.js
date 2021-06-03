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
Failing Models:
[(maxthreads: 0), (msg: "")], [(maxthreads: 0), (msg: #msg)], [(maxthreads: 0.5), (msg:"")], [(maxthreads: 0.5), (msg: #msg)]

Time:
real	3m27.319s
user	3m25.265s
sys	0m2.484s
*/

console.log('MAIN: finsihed executing script')