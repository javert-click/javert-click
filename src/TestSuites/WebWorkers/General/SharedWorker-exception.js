import { async_test, setup } from '../../../js/DOM/Events/Testharness';
import { createWorker } from './support/SharedWorker-create-common';

setup({ allow_uncaught_exception: true });

async_test(function(t) {
    var worker = createWorker();
    worker.postMessage("throw");
    worker.postMessage("ping");
    worker.onmessage = function(evt) {
        // Wait for response from ping - that's how we know we have thrown the exception.
        if (evt.data == "PASS: Received ping message") {
            console.log('test passed!');
            t.done();
        }
    };
});