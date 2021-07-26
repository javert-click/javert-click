//Title: members of SharedWorkerGlobalScope

import { async_test, assert_equals } from '../../../../js/DOM/Events/Testharness';
const SharedWorkerInfo = require('../../../../js/MessagePassing/WebWorkers/SharedWorker');
const SharedWorker = SharedWorkerInfo.SharedWorker;

async_test(t => {
  const worker = new SharedWorker('global-members-worker.js');
  worker.port.onmessage = t.step_func_done(e => {
    assert_equals(e.data, '');
  });
}, 'Test if global members exist in a shared worker');