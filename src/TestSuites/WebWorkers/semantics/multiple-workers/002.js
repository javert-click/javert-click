import { async_test, assert_array_equals } from '../../../../js/DOM/Events/Testharness';
const WorkerInfo = require('../../../../js/MessagePassing/WebWorkers/Worker');
const Worker = WorkerInfo.Worker;

async_test(function(t) {
    var w1 = new Worker('002-worker.js');
    var w2 = new Worker('002-worker.js');
    var w3 = new Worker('002-worker.js');
    var got = [false, false, false];
    var check_done = t.step_func(function() {
                         if (got.every(function(x) {return x})) {
                             t.done();
                         }
                     });
    w1.onmessage = t.step_func(function(e) {got[0] = true; check_done()});
    w2.onmessage = t.step_func(function(e) {got[1] = true; check_done()});
    // The assert was not present and we added to guarantee that result is correct
    w3.onmessage = t.step_func(function(e) {got[2] = true; check_done(); assert_array_equals(got, [true, true, true])});
});