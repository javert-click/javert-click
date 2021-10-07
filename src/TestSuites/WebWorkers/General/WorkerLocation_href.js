//Title: WorkerLocation href attribute

import { async_test, assert_equals } from '../../../js/DOM/Events/Testharness';
const WorkerInfo = require('../../../js/MessagePassing/WebWorkers/Worker');
const Worker = WorkerInfo.Worker;

async_test(function(t) {
  var worker = new Worker("./support/WorkerLocation.js?srch%20#hash");
  worker.onmessage = t.step_func_done(function(e) {
    var href = location.href;
    var expected = href.substring(0, href.lastIndexOf('/')) + "/support/WorkerLocation.js?srch%20#hash";
    assert_equals(e.data.href, expected);
  });
});