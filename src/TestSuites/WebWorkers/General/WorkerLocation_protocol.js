//Title: WorkerLocation URL decomposition IDL attribute: protocol

import { async_test, assert_equals } from '../../../js/DOM/Events/Testharness';
const WorkerInfo = require('../../../js/MessagePassing/WebWorkers/Worker');
const location = require('../../../js/MessagePassing/WebMessaging/Location');
const Worker = WorkerInfo.Worker;

async_test(function(t) {
    var worker = new Worker('WorkerLocation.js');
    worker.onmessage = t.step_func_done(function(e) {
      assert_equals(e.data.protocol, location.protocol);
    });
});