//Title: postMessage with user activtion to a worker
console.log('importing harness');
import { promise_test, assert_equals  } from '../../../js/DOM/Events/Testharness';
console.log('now promises');
const PromiseInfo = require('../../../js/Promises/Promise');
const Promise = PromiseInfo.Promise;
console.log('now workers');
const WorkerInfo = require('../../../js/MessagePassing/WebWorkers/Worker');
const Worker = WorkerInfo.Worker;

console.log('Going to call promise_test');

promise_test(async function(t) {
    console.log('Going to create worker');
    var worker = new Worker("worker_postMessage_user_activation.js");
    console.log('Worker created!');
    let workerReply = () => { console.log('Going to create promise'); return new Promise((resolve, reject) => {
      console.log('Going to add worker handler');
      worker.addEventListener('message', (e) => { console.log('Main: got message '+e.data); resolve(e.data)}, {once: true});
    })};
    console.log('Going to post message to worker');
    worker.postMessage(null, {includeUserActivation: true});
    assert_equals(await workerReply(), true);
    worker.postMessage(null, {includeUserActivation: false});
    assert_equals(await workerReply(), false);
}, "Post Message from a worker");
  