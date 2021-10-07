//Title: Test terminating a chain of nested workers by calling terminate() from the owning document
import { async_test, assert_equals } from '../../../js/DOM/Events/Testharness';
const WorkerInfo = require('../../../js/MessagePassing/WebWorkers/Worker');
const Worker = WorkerInfo.Worker;

async_test(function() {
  const worker = new Worker("support/parent_of_nested_worker.js");
  worker.onmessage = this.step_func_done(function(e) {
    assert_equals(e.data, "Pass");
    worker.terminate();
  });
});