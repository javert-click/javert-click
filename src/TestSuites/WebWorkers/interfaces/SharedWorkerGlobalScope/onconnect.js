//Title: onconnect

import { async_test, assert_array_equals } from '../../../../js/DOM/Events/Testharness';
const SharedWorkerInfo = require('../../../../js/MessagePassing/WebWorkers/SharedWorker');
const SharedWorker = SharedWorkerInfo.SharedWorker;

async_test(function() {
  var w1 = new SharedWorker('onconnect-worker.js', '');
  w1.port.addEventListener('message', this.step_func(function(e) {
    assert_array_equals(e.data, ['null', 'null', 'function', '']);
    //assert_array_equals(e.data, ['null', '[object Object]', 'function', '']);
  }), false);
  w1.port.start();
});