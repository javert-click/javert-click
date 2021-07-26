import { async_test, assert_equals } from '../../../../js/DOM/Events/Testharness';
const SharedWorkerInfo = require('../../../../js/MessagePassing/WebWorkers/SharedWorker');
const WindowInfo = require('../../../../js/DOM/Events/Window');
const SharedWorker = SharedWorkerInfo.SharedWorker;

const window = WindowInfo.getInstance();

async_test(t => {
    const expected = 'XMLHttpRequest WebSocket EventSource MessageChannel Worker SharedWorker ApplicationCache'.split(' ');
    const supported = [];
    for (let i = 0; i < expected.length; ++i) {
    if (expected[i] in window)
       supported.push(expected[i]);
    }
    const worker = new SharedWorker('interface-objects-worker.js');
    worker.port.start();
    worker.port.postMessage(supported);
    worker.port.onmessage = t.step_func_done(e => {
      assert_equals(e.data, '');
    });
  }, 'Test if interface objects exist in a shared worker');