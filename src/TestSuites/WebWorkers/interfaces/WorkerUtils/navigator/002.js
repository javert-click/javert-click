import { async_test, assert_equals } from '../../../../../js/DOM/Events/Testharness';
const WorkerInfo = require('../../../../../js/MessagePassing/WebWorkers/Worker');
const Worker = WorkerInfo.Worker;

async_test(function() {
  var worker = new Worker('002-nav-worker.js');
  worker.onmessage = this.step_func(function(e) {
    assert_equals(e.data, navigator.appName);
    this.done();
  });
});