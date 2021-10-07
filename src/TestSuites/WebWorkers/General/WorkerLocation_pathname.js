//Title: WorkerLocation URL decomposition IDL attribute: pathname

import { async_test, assert_equals } from '../../../js/DOM/Events/Testharness';
const WorkerInfo = require('../../../js/MessagePassing/WebWorkers/Worker');
const Worker = WorkerInfo.Worker;

async_test(function(t) {
  var worker = new Worker('./support/WorkerLocation.js');
  worker.onmessage = t.step_func_done(function(e) {
    var pathname = location.pathname;
    var expected = pathname.substring(0, pathname.lastIndexOf('/')) + '/support/WorkerLocation.js';
    assert_equals(e.data.pathname, expected);
  });
});