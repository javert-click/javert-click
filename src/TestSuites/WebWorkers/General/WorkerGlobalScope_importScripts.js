//Title: WorkerGlobalScope API: importScripts()

import { Worker } from '../../../js/MessagePassing/WebWorkers/Worker';
import { async_test, assert_equals } from '../../../js/DOM/Events/Testharness';

async_test(function(t) {
  var worker = new Worker("./support/ImportScripts.js");
  worker.onmessage = t.step_func_done(function(e) {
    assert_equals(e.data, "Pass");
  });
  worker.postMessage("ping");
});