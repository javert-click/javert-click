//Title: Test SharedWorker script error handling functionality

import { promise_test, assert_unreached, assert_equals } from '../../../js/DOM/Events/Testharness';
const PromiseInfo = require('../../../js/Promises/Promise');
const SharedWorkerInfo = require('../../../js/MessagePassing/WebWorkers/SharedWorker');
const Promise = PromiseInfo.Promise;
const SharedWorker = SharedWorkerInfo.SharedWorker;

promise_test(t => {
    let worker;

    return new Promise((resolve) => {
        worker = new SharedWorker("SharedWorker-script-error-worker.js");
        // Shared workers should only invoke onerror for loading errors.
        worker.onerror = function(evt) {
            assert_unreached("FAIL: onerror invoked for a script error.");
        };
        worker.port.postMessage("unhandledError");
        worker.port.onmessage = resolve;
    }).then(e => {
        console.log('Going to check assert1');
        assert_equals(e.data, "SUCCESS: unhandled error generated");
    });
}, 'Test script error unhandled.')

promise_test(t => {
    let worker;

    return new Promise((resolve) => {
        worker = new SharedWorker("SharedWorker-script-error-worker.js");
        // Shared workers should only invoke onerror for loading errors.
        worker.onerror = function(evt) {
            assert_unreached("FAIL: onerror invoked for a script error.");
        };
        worker.port.postMessage("handledError");
        worker.port.onmessage = resolve;
    }).then(e => {
        console.log('Going to check assert2');
        assert_equals(e.data, "SUCCESS: error handled via onerror");
    });
}, 'Test script error handled.')