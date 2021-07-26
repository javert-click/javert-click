import {async_test, assert_equals} from '../../../../js/DOM/Events/Testharness';

const WorkerInfo = require('../../../../js/MessagePassing/WebWorkers/Worker');
const Worker = WorkerInfo.Worker;

var t = async_test();
t.step(function() {
  var worker = new Worker('terminate-worker.js');
  var i = 0;
  var expected;

  worker.onmessage = t.step_func(function() {
    i++;
  });

  setTimeout(t.step_func(function() {
    expected = i;
    start_time = Date.now();
    //Hang the main thread for a bit to give the worker the chance to post some more messages
    console.log('Main: going to hang for a while');
    //while(Date.now() - start_time < 500) {
    while(Date.now() - start_time < 10) {
      //pass
    }
    console.log('Main: going to terminate worker');
    worker.terminate();
    console.log('Main: worker no longer exists');

    setTimeout(t.step_func(function() {
      assert_equals(i, expected);
      t.done();
    }), 100);

  }), 100);
});