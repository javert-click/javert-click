const WebworkerPromiseInfo = require('../../../js/MessagePassing/webworker-promise/src/index');
const WebworkerPromise = WebworkerPromiseInfo.WebworkerPromise;
const WorkerInfo = require('../../../js/MessagePassing/WebWorkers/Worker');
const Worker = WorkerInfo.Worker;

console.log('MAIN: going to create worker pool');

var msg = symb_string(msg);

const worker = new WebworkerPromise(new Worker('basicworker.js'));

console.log('MAIN: posting message to worker');
worker.postMessage(msg)
.then((response) => {
    console.log('MAIN: Got message: '+response);
    var responseIsEqual = response === msg;
    //debugger;
    JavertAssert (responseIsEqual);
})
.catch(err => {
    console.log('MAIN: Got error');
    JavertAssert(false)});

/*
Failing Models:
[(maxthreads: 0), (msg: "")], [(maxthreads: 0), (msg: #msg)], [(maxthreads: 0.5), (msg:"")], [(maxthreads: 0.5), (msg: #msg)]
*/

console.log('MAIN: finsihed executing script')