//Title: close() and setInterval
import { setup, assert_unreached, done } from '../../../../../js/DOM/Events/Testharness';

const WorkerInfo = require('../../../../../js/MessagePassing/WebWorkers/Worker');
const Worker = WorkerInfo.Worker;

setup({ single_test: true });

var worker = new Worker('setInterval-worker.js');
worker.onmessage = function(e) {
  assert_unreached("Got message");
};
worker.onerror = function(e) {
  assert_unreached("Got error");
};
console.log('MAIN: finished script');
setTimeout(done, 2000);