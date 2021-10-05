//Title: setting name

import { async_test, assert_equals } from '../../../../../js/DOM/Events/Testharness';
const SharedWorkerInfo = require('../../../../../js/MessagePassing/WebWorkers/SharedWorker');
const SharedWorker = SharedWorkerInfo.SharedWorker;

async_test(function() {
  var w1 = new SharedWorker('setting-worker.js#1', 'x');
  w1.port.addEventListener('message', this.step_func(function(e) {
    assert_equals(e.data, 1);
    this.done();
  }), false);
  w1.port.start();
});