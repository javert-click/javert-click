//Title: importScripts(1)

import { async_test, assert_equals, assert_unreached } from '../../../../../js/DOM/Events/Testharness';
const WorkerInfo = require('../../../../../js/MessagePassing/WebWorkers/Worker');
const Worker = WorkerInfo.Worker;

async_test(function() {
  var worker = new Worker('012-worker.js');
  worker.onmessage = this.step_func(function(e) {
    assert_equals(e.data, '1');
    this.done();
  });
  worker.onerror = this.step_func(function(e) {
    assert_unreached(e.message);
  });
});