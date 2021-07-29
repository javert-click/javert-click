//Title: Test simple shared worker construction case.

import { promise_test, assert_equals } from '../../../js/DOM/Events/Testharness';
const PromiseInfo = require('../../../js/Promises/Promise');
const SharedWorkerInfo = require('../../../js/MessagePassing/WebWorkers/SharedWorker');
const Promise = PromiseInfo.Promise;
const SharedWorker = SharedWorkerInfo.SharedWorker;

promise_test(t => {
    let worker;

    return new Promise(resolve => {
        worker = new SharedWorker('SharedWorker-common.js', 'name');
        worker.port.postMessage("ping");
        worker.port.onmessage = resolve;
    }).then(e => {
        assert_equals(e.data, "PASS: Received ping message");
    });
});