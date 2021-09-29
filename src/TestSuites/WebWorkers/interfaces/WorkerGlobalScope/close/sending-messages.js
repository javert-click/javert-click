//Title: close() and sending messages

import { async_test, assert_equals } from '../../../../../js/DOM/Events/Testharness';

const WorkerInfo = require('../../../../../js/MessagePassing/WebWorkers/Worker');
const Worker = WorkerInfo.Worker;

async_test(function() {
  var worker = new Worker('sending-messages-worker.js');
  var i = 0;
  worker.onmessage = this.step_func(function(e) {
    i++;
    assert_equals(e.data, i);
    if (i == 2) {
      this.done();
    }
  });
});