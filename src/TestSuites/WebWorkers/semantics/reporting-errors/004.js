
//Title: shared worker in two documents and window.onerror
import { setup, async_test, assert_equals, assert_unreached } from '../../../../js/DOM/Events/Testharness';
const SharedWorkerInfo = require('../../../../js/MessagePassing/WebWorkers/SharedWorker');
const SharedWorker = SharedWorkerInfo.SharedWorker;
const WindowInfo = require('../../../../js/DOM/Events/Window');
const window = WindowInfo.getInstance();

setup({allow_uncaught_exception:true});
var t = async_test(function() {
  window.onerror = this.step_func(function(a) {
    assert_unreached('(outer) window.onerror invoked: ' + a);
  });
  var worker = new SharedWorker('004-error-worker.js', '');
  worker.addEventListener('error', this.step_func(function(e) {
    assert_unreached('(outer) error on worker');
  }), false);
  worker.port.addEventListener('error', this.step_func(function(e) {
    assert_unreached('(outer) error on port');
  }), false);
  worker.port.onmessage = this.step_func(function(e) {
    assert_equals(e.data, 1);
    //TODO MP
    //var iframe = document.createElement('iframe');
    //iframe.src = '004-1.html';
    //document.body.appendChild(iframe);
    window.onerror = this.step_func(function(a) {
      assert_unreached('(inner) window.onerror invoked: ' + a);
    });
    var worker = new SharedWorker('004-error-worker.js', '');
    worker.addEventListener('error', this.step_func(function(e) {
      assert_unreached('(inner) error on worker');
    }), false);
    worker.port.addEventListener('error', this.step_func(function(e) {
      assert_unreached('(inner) error on port');
    }), false);
    worker.port.onmessage = this.step_func_done(function(e) {
      assert_equals(e.data, 2);
    });
  });
});