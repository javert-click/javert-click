import { assert_true } from '../../../../DOM/Events/Testharness';

const Worker = require('../../../../MessagePassing/WebWorkers/Worker');
const Promise = require('../../../../Promises/Promise');

Worker = Worker.Worker;
Promise = Promise.Promise;

var w = new Worker('worker_buggy.js');

var wf = async(op) => {
    w.postMessage(op);

    return new Promise((res, rej) => { w.onmessage = res; });
};

(async()=>{
    var f1 = await wf("+1");
    console.log('Going to check if '+f1.data+' === 1');
    assert_true(f1.data === 1);
})();

(async()=>{
    var f2 = await wf("+2");
    console.log('Going to check if '+f2.data+' === 3');
    assert_true(f2.data === 3);
})();

