//Title: setting postMessage

import { async_test, assert_true } from '../../../../js/DOM/Events/Testharness';
const WorkerInfo = require('../../../../js/MessagePassing/WebWorkers/Worker');
const Worker = WorkerInfo.Worker;

(async_test()).step(function() {
  var worker = new Worker('setting-postMessage-worker.js');
  worker.onmessage = this.step_func(function(e) {
    assert_true(e.data);
    this.done();
  });
});