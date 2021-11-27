//Title: WorkerGlobalScope onerror event handler argument: location

import { Worker } from '../../../js/MessagePassing/WebWorkers/Worker';
import { setup, async_test, assert_equals } from '../../../js/DOM/Events/Testharness';

// The worker events races with the window's load event; if the worker events
// arrive first, the harness will detect the error event and fail the test.
setup({ allow_uncaught_exception: true });

async_test(function(t) {
  var worker = new Worker('./support/ErrorEvent.js');
  worker.onmessage = t.step_func_done(function(e) {
    var href = location.href;
    var expected = href.substring(0, href.lastIndexOf('/')) + '/support/ErrorEvent.js';
    assert_equals(e.data.filename, expected);
  });
  worker.postMessage("Error Message");
});