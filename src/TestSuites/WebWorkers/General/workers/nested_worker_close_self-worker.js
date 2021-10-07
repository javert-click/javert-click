import { async_test, done, assert_equals } from '../../../../js/DOM/Events/Testharness';
const WorkerInfo = require('../../../../js/MessagePassing/WebWorkers/Worker');
const Worker = WorkerInfo.Worker;

async_test(function() {
  if (!self.Worker)
    done();
  const worker = new Worker("WorkerClose.js");
  worker.onmessage = this.step_func_done(function(e) {
    assert_equals(e.data, "close");
    done();
  });
  worker.postMessage("close");
}, "Nested work that closes itself");