const WebworkerPromiseInfo = require('../../../js/MessagePassing/webworker-promise/src/index');
const WebworkerPromise = WebworkerPromiseInfo.WebworkerPromise;
const WorkerInfo = require('../../../js/MessagePassing/WebWorkers/Worker');
const Worker = WorkerInfo.Worker;
import {assert_object_equals} from '../../../js/DOM/Events/Testharness';

console.log('MAIN: creating worker');

var v1 = symb_string(v1);
var v2 = symb_string(v2);
var v3 = symb_string(v3);
console.log('going to create obj with symb str');
var msg = {p1: v1, p2: v2, p3: v3};
console.log('obj created, now creating worker');

const worker = new WebworkerPromise(new Worker('basicworker.js'));

console.log('MAIN: posting message to worker');
worker.postMessage(msg)
.then((response) => {
    console.log('MAIN: Got message: '+response);
    assert_object_equals(response, msg);
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