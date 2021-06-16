//Title: Test setTimeOut,fired in decreasing order in Web Workers.

import { Worker } from '../../../js/MessagePassing/WebWorkers/Worker';
import { Promise } from '../../../js/Promises/Promise';
import { promise_test, assert_equals } from '../../../js/DOM/Events/Testharness';

promise_test (t => {
    let worker;
  
    return new Promise(resolve => {
      worker = new Worker('Worker-timeout-increasing-order-worker.js');
      worker.postMessage('start');
      worker.onmessage = resolve;
    }).then(evt => {
      console.log('Checking if '+evt.data+' is equal to 1');
      assert_equals(evt.data, 1);
      return (new Promise(resolve => worker.onmessage = resolve));
    }).then(evt => {
      console.log('Checking if '+evt.data+' is equal to 2');
      assert_equals(evt.data, 2);
      return (new Promise(resolve => worker.onmessage = resolve));
    }).then(evt => {
      console.log('Checking if '+evt.data+' is equal to 3');
      assert_equals(evt.data, 3);
    });
  }, 'Tests timeouts on the worker are fired in increasing order.');