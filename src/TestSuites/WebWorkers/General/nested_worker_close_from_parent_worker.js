//Title: Test terminating a nested workers by calling terminate() from its parent worker

import { Worker } from '../../../js/MessagePassing/WebWorkers/Worker';
import { async_test, assert_equals, done } from '../../../js/DOM/Events/Testharness';

async_test(function() {
    const worker = new Worker("support/parent_of_nested_worker.js");
    worker.onmessage = this.step_func_done(function(e) {
      assert_equals(e.data, "Pass");
      done();
    });
    worker.postMessage("close");
});