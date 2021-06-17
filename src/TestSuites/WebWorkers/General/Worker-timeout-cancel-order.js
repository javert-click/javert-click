//Title: Test setTimeOut,cancelTimeout in Web Workers

import { Promise } from '../../../js/Promises/Promise';
import { Worker } from '../../../js/MessagePassing/WebWorkers/Worker';
import { promise_test, assert_equals } from '../../../js/DOM/Events/Testharness';

promise_test(t => {
    return new Promise(resolve => {
      var worker = new Worker('Worker-timeout-cancel-order-worker.js');
      worker.postMessage('start');
      worker.onmessage = resolve;
    }).then(evt => {
      console.log('Asserting that '+evt.data+'=== 2');
      assert_equals(evt.data, 2, 'Timeout not canceled');
    });
  }, 'Tests setting and canceling timeout in workers.');