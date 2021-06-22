//Title: Web Workers: Worker ErrorEvent - bubbles, cancelable

// The worker events races with the window's load event; if the worker events
// arrive first, the harness will detect the error event and fail the test.
import { Worker } from '../../../js/MessagePassing/WebWorkers/Worker';
import { async_test, setup, assert_false, assert_true } from '../../../js/DOM/Events/Testharness';

setup({ allow_uncaught_exception: true });

async_test(function(t) {
  var worker = new Worker('ErrorEvent.js');
  worker.onerror = t.step_func_done(function(e) {
    console.log('MAIN: got message. e.bubbles: '+e.bubbles+', e.cancelable: '+e.cancelable);
    assert_false(e.bubbles, "onerror on worker doesn't bubble");
    assert_true(e.cancelable, "onerror on worker is cancelable");
  });
  worker.postMessage("Error Message");
}, "ErrorEvent on worker doesn't bubble and is cancelable");