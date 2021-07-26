//Title: unexpected members/interface objects/constructors

import { async_test, assert_equals } from '../../../../js/DOM/Events/Testharness';
const SharedWorkerInfo = require('../../../../js/MessagePassing/WebWorkers/SharedWorker');
const SharedWorker = SharedWorkerInfo.SharedWorker;

async_test(t => {
  const worker = new SharedWorker('unexpected-global-properties-worker.js');
  worker.port.onmessage = t.step_func_done(e => {
    assert_equals(e.data, '');
  });
}, 'Test unexpected properties are not in global scope');