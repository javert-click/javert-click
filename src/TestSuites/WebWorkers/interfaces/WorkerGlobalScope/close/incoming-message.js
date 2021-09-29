//Title: close() and incoming message
import { setup, assert_unreached, done } from '../../../../../js/DOM/Events/Testharness';

const WorkerInfo = require('../../../../../js/MessagePassing/WebWorkers/Worker');
const Worker = WorkerInfo.Worker;

setup({ single_test: true });

var worker = new Worker('incoming-message-worker.js');
worker.onmessage = function(e) {
  assert_unreached("Got message");
};
worker.onerror = function(e) {
  assert_unreached("Got error");
};
worker.postMessage(1);
console.log('MAIN: finished script');
setTimeout(done, 2000);