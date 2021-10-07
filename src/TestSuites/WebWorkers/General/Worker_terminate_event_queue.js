//Title: AbstractWorker terminate(): clear event queue

import { Worker } from '../../../js/MessagePassing/WebWorkers/Worker';
import { async_test, assert_equals } from '../../../js/DOM/Events/Testharness';

async_test(function() {
  var testResult;
  var worker = new Worker('./support/WorkerTerminate.js');
  worker.onmessage = this.step_func(function(e) {
    console.log('Main: worker sent message '+e.data);
    testResult = e.data;
    if (testResult >= 4) {
      worker.terminate();
      worker.onmessage = this.unreached_func('Unexpected message event');
      setTimeout(this.step_func_done(function() {
        assert_equals(testResult, 4);
      }), 100);
    }
  });
  worker.postMessage("ping");
});