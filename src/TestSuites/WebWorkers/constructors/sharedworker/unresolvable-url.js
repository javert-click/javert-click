//Title: resolving broken url
import { test, assert_throws_dom } from '../../../../js/DOM/Events/Testharness';
const SharedWorkerInfo = require('../../../../js/MessagePassing/WebWorkers/SharedWorker');
const SharedWorker = SharedWorkerInfo.SharedWorker;

test(() => {
  assert_throws_dom("SyntaxError", () => {
    const worker = new SharedWorker('http://foo bar');
  });
});