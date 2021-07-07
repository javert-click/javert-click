//Title: postMessage with user activtion to a worker

import { promise_test, assert_equals  } from '../../../js/DOM/Events/Testharness';
const PromiseInfo = require('../../../js/Promises/Promise');
const Promise = PromiseInfo.Promise;
const WorkerInfo = require('../../../js/MessagePassing/WebWorkers/Worker');
const Worker = WorkerInfo.Worker;

promise_test(async function(t) {
    var worker = new Worker("worker_postMessage_user_activation.js");
    let workerReply = () => { console.log('Going to create promise'); return new Promise((resolve, reject) => {
      console.log('Going to add worker handler');
      //worker.addEventListener('message', (e) => { console.log('Main: got message '+e.data); resolve(e.data)}, {once: true});
      worker.onmessage = (e) => { console.log('Main: got message '+e.data); resolve(e.data)};
    })};
    //worker.onmessage = (e) => { console.log('Main: got message '+e.data)};
    console.log('Going to post message to worker');
    worker.postMessage(null, {includeUserActivation: true});
    assert_equals(await workerReply(), true);
    worker.postMessage(null, {includeUserActivation: false});
    assert_equals(await workerReply(), false);
}, "Post Message from a worker");
  