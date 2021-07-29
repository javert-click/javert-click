//Title: e.ports in dedicated worker

import { async_test, assert_true } from '../../../../js/DOM/Events/Testharness';
const WorkerInfo = require('../../../../js/MessagePassing/WebWorkers/Worker');
const Worker = WorkerInfo.Worker;

(async_test()).step(function() {
  var worker = new Worker('event-ports-dedicated-worker.js');
  worker.postMessage(1);
  worker.onmessage = this.step_func(function(e) {
    assert_true(e.data);
    this.done();
  });
});