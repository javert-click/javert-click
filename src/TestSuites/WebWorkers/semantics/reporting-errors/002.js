//Title: shared worker, addEventListener

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
  var worker = new SharedWorker('002-error-worker.js', '');
  console.log('MAIN: shared worker created!');
  worker.port.onmessage = this.step_func_done(function(e) {
    console.log('MAIN: received message '+e.data);
    assert_equals(e.data, '');
  });
});