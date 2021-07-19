//Title: Base URL in module dedicated workers: import

import { async_test, assert_equals } from '../../../../js/DOM/Events/Testharness';
const WorkerInfo = require('../../../../js/MessagePassing/WebWorkers/Worker');
const Worker = WorkerInfo.Worker;

async_test(function() {
  var worker = new Worker("gammaimport.js", {type: "module"});
  worker.onmessage = this.step_func_done(function(e) {
    console.log('MAIN: got msg '+e.data);
    assert_equals(e.data, "gamma/script-module.js");
  });
  worker.onerror = this.unreached_func("Got error event");
});