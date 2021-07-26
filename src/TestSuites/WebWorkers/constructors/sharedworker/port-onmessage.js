//Title: port.onmessage

import { test, assert_equals } from '../../../../js/DOM/Events/Testharness';
const SharedWorkerInfo = require('../../../../js/MessagePassing/WebWorkers/SharedWorker');
const SharedWorker = SharedWorkerInfo.SharedWorker;

test(() => {
  const worker = new SharedWorker('port-onmessage-worker.js');
  worker.port.onmessage = (e) => {
    assert_equals(e.data, true);
  }
});