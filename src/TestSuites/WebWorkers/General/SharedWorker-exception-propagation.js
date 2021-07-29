import { async_test } from '../../../js/DOM/Events/Testharness';
import { createWorker } from './support/SharedWorker-create-common';

const WindowInfo = require('../../../js/DOM/Events/Window');
const window = WindowInfo.getInstance();

setup({ allow_uncaught_exception: true });

async_test(function(t) {
    window.addEventListener("error", t.unreached_func("error event fired"));
    var worker = createWorker();
    worker.postMessage("throw");
    worker.postMessage("ping");
    var pongs = 0;
    worker.onmessage = function(evt) {
        // Wait for response from ping - that's how we know we have thrown the exception.
        if (evt.data == "PASS: Received ping message") {
            pongs++;
            if (pongs == 1) {
                // Send another "ping" message and wait for the response before
                // ending the test, so that any error propagation that is now
                // in flight will have finished.
                worker.postMessage("ping");
            } else {
                t.done();
            }
        }
    };
});