import { async_test, assert_equals, done } from '../../../../js/DOM/Events/Testharness';
const WorkerInfo = require('../../../../js/MessagePassing/WebWorkers/Worker');
const Worker = WorkerInfo.Worker;

async_test(function() {
    var worker1 = new Worker("WorkerBasic.js");
    worker1.postMessage("ping");
    worker1.onmessage = this.step_func_done(function(evt) {
        assert_equals(evt.data, "Pass");
        worker1.terminate();
    });
}, "Nested worker");
done();