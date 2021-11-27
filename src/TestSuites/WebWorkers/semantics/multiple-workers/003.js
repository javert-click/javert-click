import { async_test, assert_equals } from '../../../../js/DOM/Events/Testharness';
const WorkerInfo = require('../../../../js/MessagePassing/WebWorkers/Worker');
const Worker = WorkerInfo.Worker;

async_test(function() {
  var w1 = new Worker('003-multiple-worker.js#1');
  w1.onmessage = this.step_func(function(e) {
    assert_equals(e.data, '123');
    this.done();
  });
  w1.onerror = this.unreached_func("error");
});