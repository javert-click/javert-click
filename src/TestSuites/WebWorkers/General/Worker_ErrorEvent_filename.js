//Title: AbstractWorker ErrorEvent.filename

import { Worker } from '../../../js/MessagePassing/WebWorkers/Worker';
import { setup, async_test, assert_equals } from '../../../js/DOM/Events/Testharness';

setup({ allow_uncaught_exception: true });

async_test(function(t) {
  var worker = new Worker('./support/ErrorEvent.js');
  worker.onerror = t.step_func_done(function(e) {
    var href = location.href;
    var expected = href.substring(0, href.lastIndexOf('/')) + '/support/ErrorEvent.js';
    console.log('MAIN: got filename '+e.filename);
    assert_equals(e.filename, expected);
  });
  worker.postMessage("Error Message");
});