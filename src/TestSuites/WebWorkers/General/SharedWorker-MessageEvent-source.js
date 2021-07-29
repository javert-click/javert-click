import { test } from '../../../js/DOM/Events/Testharness';
const SharedWorkerInfo = require('../../../js/MessagePassing/WebWorkers/SharedWorker');
const SharedWorker = SharedWorkerInfo.SharedWorker;

console.log('MAIN: creating worker');
test(t => {
  const worker = new SharedWorker('SharedWorker-MessageEvent-source-worker.js');
  console.log('MAIN: worker created');
}, 'Test connect event for a shared worker');