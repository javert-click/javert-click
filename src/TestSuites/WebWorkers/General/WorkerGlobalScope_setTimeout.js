//Title: WorkerGlobalScope API: setTimeout()

import { async_test, assert_array_equals } from '../../../js/DOM/Events/Testharness';
const WorkerInfo = require('../../../js/MessagePassing/WebWorkers/Worker');
const Worker = WorkerInfo.Worker;

async_test(function(t) {
    var result = [];
    var worker = new Worker('Timer.js');
    worker.onmessage = t.step_func(function(e) {
      result.push(e.data);
      if (result.length == 3) {
        assert_array_equals(result, ["hello", "worker", "worker"]);
        worker.onmessage = t.unreached_func('Unexpected message event');
        setTimeout(t.step_func_done(), 100);
      }
    });
    worker.postMessage("TimeoutHandler");
});