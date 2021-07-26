import {async_test, assert_equals} from '../../../../js/DOM/Events/Testharness';

const WorkerInfo = require('../../../../js/MessagePassing/WebWorkers/Worker');
const Worker = WorkerInfo.Worker;

var t = async_test();
t.step(function() {
  var worker = new Worker(1);
  worker.addEventListener('message', t.step_func_done(function(e) {
    assert_equals(e.data, '1')
  }), false);
});