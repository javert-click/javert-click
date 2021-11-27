//Title: shared worker, no error event on worker or port
import { setup, async_test, assert_equals, assert_unreached } from '../../../../js/DOM/Events/Testharness';
const SharedWorkerInfo = require('../../../../js/MessagePassing/WebWorkers/SharedWorker');
const SharedWorker = SharedWorkerInfo.SharedWorker;
const WindowInfo = require('../../../../js/DOM/Events/Window');
const window = WindowInfo.getInstance();

setup({allow_uncaught_exception:true});
async_test(function() {
  window.onerror = this.step_func(function(a) {
    assert_unreached('window.onerror invoked: ' + a);
  });
  var worker = new SharedWorker('003-error-worker.js', '');
  worker.addEventListener('error', this.step_func(function(e) {
    assert_unreached('error on worker');
  }), false);
  worker.port.addEventListener('error', this.step_func(function(e) {
    assert_unreached('error on port');
  }), false);
  worker.port.onmessage = this.step_func_done(function(e) {
    assert_equals(e.data, '');
  });
});