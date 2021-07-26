import { async_test, assert_equals } from '../../../../js/DOM/Events/Testharness';
const SharedWorkerInfo = require('../../../../js/MessagePassing/WebWorkers/SharedWorker');
const SharedWorker = SharedWorkerInfo.SharedWorker;

async_test(t => {
  const worker = new SharedWorker(null, null);
  worker.port.onmessage = t.step_func_done(e => {
    assert_equals(e.data[0], 'null', 'first arg (script name)');
    assert_equals(e.data[1], '', 'second arg (worker name)');
  });
}, 'Test constructing a shared worker with null');