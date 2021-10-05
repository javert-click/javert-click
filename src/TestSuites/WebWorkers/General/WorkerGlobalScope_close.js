//Title: Test WorkerGlobalScope.close functionality.

import { async_test, assert_equals } from '../../../js/DOM/Events/Testharness';
const WorkerInfo = require('../../../js/MessagePassing/WebWorkers/Worker');
const Worker = WorkerInfo.Worker;

setup({ allow_uncaught_exception: true });

async_test(function(t) {
  var worker = new Worker('support/WorkerGlobalScope-close.js');
  worker.postMessage("typeofClose");
    worker.onmessage = t.step_func_done(function(evt) {
      assert_equals(evt.data, "typeof close: function");
    });
}, 'Test type of close function.');

/*async_test(function(t) {
  var worker = new Worker('support/WorkerGlobalScope-close.js');
  worker.postMessage("ping");
  worker.onmessage = t.step_func(function(evt) {
    assert_equals(evt.data, "pong");
    // Tell the worker to close, then send a followup message.
    worker.postMessage("close");

    // The worker may or may not be closing/closed by this call. If it is, the
    // message won't be enqueued on the worker's event loop. If it isn't, the
    // message will be enqueued but shouldn't be handled by the worker because
    // the prior postMessage will cause the worker to close. In either case,
    // the worker shouldn't postMessage back "pong".
    //
    // This also means that at this point we can't confidently test
    // postMessage-ing a worker that will close nor a worker that is already
    // closing/closed.
    worker.postMessage("ping");

    worker.onmessage = t.step_func(function(evt) {
      assert_not_equals(evt.data, "pong");

      // The worker should definitely be closed by now, so we can confidently
      // test postMessage-ing a closed worker. This postMessage shouldn't throw
      // or cause the worker to postMessage back "pong" (it shouldn't receive
      // any events after closing).
      worker.postMessage("ping");

      t.step_timeout(function() { t.done(); }, 500);
    });
  });
}, 'Test sending a message after closing.');

async_test(function(t) {
  var worker = new Worker('support/WorkerGlobalScope-close.js');
  worker.postMessage("closeWithError");
  worker.onerror = function(event) {
    t.done()
  };
}, 'Test errors are delivered after close.');

async_test(function(t) {
  var worker = new Worker('support/WorkerGlobalScope-close.js');
  worker.postMessage("closeWithPendingEvents");
  worker.onmessage = t.step_func(function(evt) {
    assert_unreached("Pending events should not fire: " + evt.data);
  });
  worker.onerror = t.step_func(function(evt) {
    assert_unreached("Pending events should not fire:" + evt.message);
  });
  t.step_timeout(function() { t.done(); }, 500);
}, 'Test workers do not deliver pending events.');

async_test(function(t) {
  var worker = new Worker('support/WorkerGlobalScope-close.js');
  worker.postMessage("close");
  worker.onmessage = function(evt) {
    assert_equals(evt.data, "Should be delivered");
    // Give worker a chance to close first, then terminate it.
    t.step_timeout(function() {
      worker.terminate();
      t.done();
    }, 500);
  };
}, 'Test terminating a worker after close.');*/