//Title: Test simultaneous errors on workers.

import { Promise } from '../../../js/Promises/Promise';
import { Worker } from '../../../js/MessagePassing/WebWorkers/Worker';
import { promise_test, assert_equals } from '../../../js/DOM/Events/Testharness';

promise_test(t => {
    var workers = 4;
    var promises = [];

    for (var i = 0; i < workers; ++i) {
        var worker = new Worker('throw-on-message-Worker.js');
        promises.push(new Promise(function(resolve, reject) {
            var error = 0;
            worker.onmessage = function(event) {
                console.log('MAIN: got data: '+event.data);
                if (event.data === 'second'){
                    resolve(error);
                } else if (event.data === 'error')
                    ++error;
            }
        }));
        worker.postMessage('first');
        worker.postMessage('second');
    }

    return Promise.all(promises).then(e => {
        var sum = 0;
        for (var i = 0; i < e.length; i++) {
            sum += e[i];
        }
        console.log('MAIN: assert_equals('+sum+', '+workers+')');
        assert_equals(sum, workers);
    });
});