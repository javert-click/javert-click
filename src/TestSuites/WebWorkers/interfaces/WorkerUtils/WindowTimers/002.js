//Title: clearTimeout

import { async_test, assert_false } from '../../../../../js/DOM/Events/Testharness';
const WorkerInfo = require('../../../../../js/MessagePassing/WebWorkers/Worker');
const Worker = WorkerInfo.Worker;

async_test(function() {
  var worker = new Worker('002-worker.js');
  var gotMessage = false;
  worker.onmessage = function() { gotMessage = true; };
  setTimeout(this.step_func(function() { assert_false(gotMessage); this.done(); }), 100);
});