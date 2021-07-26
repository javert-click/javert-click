import { async_test, assert_true } from '../../../../js/DOM/Events/Testharness';
const SharedWorkerInfo = require('../../../../js/MessagePassing/WebWorkers/SharedWorker');
const SharedWorker = SharedWorkerInfo.SharedWorker;

async_test(t => {
  const worker = new SharedWorker('connect-event-worker.js');
  worker.port.onmessage = t.step_func_done(e => {
    assert_true(e.data[0], "e.data === ''");
    assert_true(e.data[1], "e instanceof MessageEvent");
    assert_true(e.data[2], "e.ports.length == 1");
  });
}, 'Test connect event for a shared worker');