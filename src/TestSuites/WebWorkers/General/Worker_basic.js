//Title: Web Workers Basic Tests

import { Worker } from '../../../js/MessagePassing/WebWorkers/Worker';
import { test, async_test, assert_class_string, assert_equals } from '../../../js/DOM/Events/Testharness';

function create_worker() {
  return new Worker('WorkerBasic.js');
}

test(function() {
  var worker = create_worker();
  console.log('Worker class: '+({}.toString.call(worker)));
  assert_class_string(worker, "Worker");
}, "Worker constructor");

async_test(function(t) {
  var worker = create_worker();
  worker.onmessage = t.step_func_done(function(e) {
    console.log('MAIN, 2nd test. e.data===Pass? '+(e.data === "Pass"));
    assert_equals(e.data, "Pass");
  });
  worker.postMessage("start");
}, "MessageEvent.data");

async_test(function(t) {
  var worker = create_worker();
  worker.addEventListener("message", t.step_func_done(function(e) {
    console.log('MAIN, 3rd test. e.type===message? '+(e.data === "message"));
    assert_equals(e.type, "message");
  }), true);
  worker.postMessage("start");
}, "MessageEvent.type");