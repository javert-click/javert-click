// The worker events races with the window's load event; if the worker events
// arrive first, the harness will detect the error event and fail the test.

import { Worker } from '../../../js/MessagePassing/WebWorkers/Worker';
import { setup, async_test, assert_greater_than } from '../../../js/DOM/Events/Testharness';

setup({ allow_uncaught_exception: true });

async_test(function(t) {
  var message = 'Error Message';
  var worker = new Worker('./support/ErrorEvent.js');
  worker.onmessage = t.step_func_done(function(e) {
    assert_greater_than(e.data.message.indexOf(message), -1);
  });
  worker.postMessage(message);
});