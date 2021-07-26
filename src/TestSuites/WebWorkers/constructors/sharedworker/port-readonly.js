//Title: setting worker.port

import { test, assert_equals } from '../../../../js/DOM/Events/Testharness';
const SharedWorkerInfo = require('../../../../js/MessagePassing/WebWorkers/SharedWorker');
const SharedWorker = SharedWorkerInfo.SharedWorker;

test(() => {
  const worker = new SharedWorker('empty.js', '');
  const x = worker.port;
  worker.port = 1;
  assert_equals(worker.port, x);
});