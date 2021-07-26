import {async_test, assert_equals} from '../../../../js/DOM/Events/Testharness';

const WorkerInfo = require('../../../../js/MessagePassing/WebWorkers/Worker');
const Worker = WorkerInfo.Worker;

async_test(function(t) {
    var worker = new Worker('worker.js');
    var data = "foo";
    worker.postMessage(data);
    worker.onmessage = t.step_func_done(function(event) {
        assert_equals(event.data, data, "event.data does not match expected data");
    });
    worker.onerror = t.unreached_func("received error event");
}, "Use the document base url when resolving worker URLs");