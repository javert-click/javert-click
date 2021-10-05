//Title: getting name

import { async_test, assert_true } from '../../../../../js/DOM/Events/Testharness';
const SharedWorkerInfo = require('../../../../../js/MessagePassing/WebWorkers/SharedWorker');
const SharedWorker = SharedWorkerInfo.SharedWorker;

var tests = [['getting-worker.js#1', ''], ['getting-worker.js#2', 'a'], ['getting-worker.js#3', -0]];
tests.forEach(function(t) {
  async_test(function() {
    var w = new SharedWorker(t[0], t[1]);
    w.port.onmessage = this.step_func(function(e) {
      assert_true(e.data);
      this.done();
    });
  });
});