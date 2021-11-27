//Title: Base URL in workers: new SharedWorker()

import { async_test, assert_equals } from '../../../../js/DOM/Events/Testharness';
const WorkerInfo = require('../../../../js/MessagePassing/WebWorkers/Worker');
const Worker = WorkerInfo.Worker;

async_test(function() {
  var worker = new Worker("gammasharedworker.js");
  worker.onmessage = this.step_func_done(function(e) {
    console.log('MAIN: got message '+e.data);
    assert_equals(e.data, "gamma");
  });
  worker.onerror = this.unreached_func("Got error event");
});