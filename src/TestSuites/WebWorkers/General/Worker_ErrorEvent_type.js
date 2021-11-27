// The worker events races with the window's load event; if the worker events
// arrive first, the harness will detect the error event and fail the test.

import { Worker } from '../../../js/MessagePassing/WebWorkers/Worker';
import { setup, async_test, assert_equals, assert_class_string } from '../../../js/DOM/Events/Testharness';

setup({ allow_uncaught_exception: true });

async_test(function(t) {
  var worker = new Worker('./support/ErrorEvent.js');
  worker.onerror = t.step_func_done(function(e) {
    assert_class_string(e, 'ErrorEvent');
    assert_equals(e.type, 'error');
  });
  worker.postMessage("Error Message");
});