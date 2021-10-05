//Title: window.performance.now in shared workers

import { async_test, assert_equals, assert_greater_than } from '../../../js/DOM/Events/Testharness';
const SharedWorkerInfo = require('../../../js/MessagePassing/WebWorkers/SharedWorker');
const SharedWorker = SharedWorkerInfo.SharedWorker;
const Window = require('../../../js/DOM/Events/Window');
const window = Window.getInstance();
const PerformanceInfo = require('../../../js/DOM/Events/Performance');
const performance = new PerformanceInfo.Performance();
window.top = window;
window.performance = performance;
const HTMLDocument = require('../../../js/DOM/Events/HTMLDocument');
const document = new HTMLDocument.HTMLDocument();
const body = document.createElement('div');
document.appendChild(body);
document.body = body;

async_test(function(t) {
    const worker = new SharedWorker('support/WorkerSendingPerformanceNow.js');
    worker.port.onmessage = t.step_func(event => {
        const results = event.data;
        assert_equals(results.length, 4);
        assert_equals(results[0], 'undefined',
          'workerStart not defined on the Worker object');
        assert_equals(results[1], 'object', 'self.performance is defined');
        assert_equals(results[2], 'function', 'self.performance.now is defined');
        assert_greater_than(results[3], 0, 'Time in the worker should be positive');
        assert_greater_than(window.performance.now(), results[3], 'Time in the worker should be before the current time in the main document');
        setupIframe();
    });
    window.iframeStartTime = 0;
    window.test_iframe = function(event) {
        const workerTime = event.data[3];
        assert_greater_than(workerTime, window.iframeStartTime,
            'Time since origin time should be greater in the shared worker than the iframe');
        t.done();
    }
    function setupIframe() {
        const iframe = document.createElement('iframe');
        document.body.appendChild(iframe);
        window.top.iframeStartTime = window.performance.now();
        const worker = new SharedWorker("support/WorkerSendingPerformanceNow.js");
        worker.port.onmessage = function(event) {
          window.top.test_iframe(event);
        };
        worker.port.postMessage("");
        //iframe.contentWindow.document.body.appendChild(script);
    }
    worker.port.postMessage('');
}, 'performance.now() exists in shared workers and reports reasonable times');