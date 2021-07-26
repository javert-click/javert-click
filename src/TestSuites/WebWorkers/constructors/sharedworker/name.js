//Title: self.name

import { async_test, assert_equals } from '../../../../js/DOM/Events/Testharness';
const SharedWorkerInfo = require('../../../../js/MessagePassing/WebWorkers/SharedWorker');
const SharedWorker = SharedWorkerInfo.SharedWorker;

async_test(t => {
  const worker = new SharedWorker('name-worker.js', 'hello');
  worker.port.onmessage = t.step_func_done(e => {
    assert_equals(e.data, 'hello');
  });
}, 'Test self.name in a shared worker');