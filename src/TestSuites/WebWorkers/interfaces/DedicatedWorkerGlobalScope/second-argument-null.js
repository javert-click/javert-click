//Title: Using null in postMessage's second argument

import { async_test, assert_equals } from '../../../../js/DOM/Events/Testharness';
const WorkerInfo = require('../../../../js/MessagePassing/WebWorkers/Worker');
const Worker = WorkerInfo.Worker;

(async_test()).step(function() {
  var worker = new Worker('second-argument-null-worker.js');
  worker.onmessage = this.step_func(function(e) {
    assert_equals(1, e.data);
    this.done();
  });
});