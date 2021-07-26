import { test, assert_throws_js } from '../../../../js/DOM/Events/Testharness';
const SharedWorkerInfo = require('../../../../js/MessagePassing/WebWorkers/SharedWorker');
const SharedWorker = SharedWorkerInfo.SharedWorker;

test(() => {
  assert_throws_js(TypeError, () => {
    const worker = new SharedWorker();
  });
});