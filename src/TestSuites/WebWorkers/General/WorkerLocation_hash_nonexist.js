//Title: WorkerLocation.hash with no &lt;fragment&gt; component

import { async_test, assert_equals } from '../../../js/DOM/Events/Testharness';
const WorkerInfo = require('../../../js/MessagePassing/WebWorkers/Worker');
const Worker = WorkerInfo.Worker;

async_test(function(t) {
    var worker = new Worker('WorkerLocation.js');
    worker.onmessage = t.step_func_done(function(e) {
      console.log('Main: Going to access e.data.hash');
      assert_equals(e.data.hash, "");
    });
});