import { async_test, assert_equals } from '../../../../../js/DOM/Events/Testharness';
const WorkerInfo = require('../../../../../js/MessagePassing/WebWorkers/Worker');
const Worker = WorkerInfo.Worker;

async_test(function() {
  var worker = new Worker('004-timer-worker.js');
  var i = 0;
  worker.onmessage = function() { i++; }
  setTimeout(this.step_func(function() { assert_equals(i, 0); this.done(); }), 100);
});