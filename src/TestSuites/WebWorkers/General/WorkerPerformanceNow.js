//Title: performance.now in dedicated workers

import { async_test, assert_equals, assert_greater_than } from '../../../js/DOM/Events/Testharness';
const WorkerInfo = require('../../../js/MessagePassing/WebWorkers/Worker');
const Worker = WorkerInfo.Worker;
const Window = require('../../../js/DOM/Events/Window');
const window = Window.getInstance();
const PerformanceInfo = require('../../../js/DOM/Events/Performance');
const performance = new PerformanceInfo.Performance();
window.top = window;
window.performance = performance;

async_test(function(t) {
    const worker = new Worker('support/WorkerSendingPerformanceNow.js');
    worker.onmessage = t.step_func_done(event => {
      const results = event.data;
      assert_equals(results.length, 4);
      assert_equals(results[0], 'undefined',
        'workerStart not defined on the Worker object');
      assert_equals(results[1], 'object', "self.performance is defined");
      assert_equals(results[2], 'function', "self.performance.now is defined");
      assert_greater_than(results[3], 0, "Time in the worker should be positive");
      assert_greater_than(window.performance.now(), results[3], "Time in the worker should be before the current time in the main document");
    });
    worker.postMessage('');
  }, 'performance.now() exists in dedicated workers and reports reasonable times');