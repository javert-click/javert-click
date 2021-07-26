import { test, assert_true } from '../../../../js/DOM/Events/Testharness';
const SharedWorkerInfo = require('../../../../js/MessagePassing/WebWorkers/SharedWorker');
const SharedWorker = SharedWorkerInfo.SharedWorker;

test(() => {
  const worker = new SharedWorker('empty.js', '');
  assert_true('port' in worker, "port");
  assert_true('postMessage' in worker.port, "postMessage");
  assert_true('start' in worker.port, "start");
  assert_true('close' in worker.port, "close");
  assert_true('onmessage' in worker.port, "onmessage");
  assert_true('addEventListener' in worker.port, "addEventListener");
  assert_true('removeEventListener' in worker.port, "removeEventListener");
  assert_true('dispatchEvent' in worker.port, "dispatchEvent");
});