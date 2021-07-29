import { async_test, assert_equals } from '../../../../js/DOM/Events/Testharness';
const WorkerInfo = require('../../../../js/MessagePassing/WebWorkers/Worker');
const SharedWorkerInfo = require('../../../../js/MessagePassing/WebWorkers/SharedWorker');
const Worker = WorkerInfo.Worker;
const SharedWorker = SharedWorkerInfo.SharedWorker;


async_test(function() {
  var worker = new Worker('001-worker.js');
  worker.onmessage = this.step_func(function(e) {
    assert_equals(e.data, 'dedicated');
    this.done();
  });
  worker.postMessage('dedicated');
}, 'dedicated');

async_test(function() {
  var shared = new SharedWorker('001-worker.js', '');
  shared.port.onmessage = this.step_func(function(e) {
    assert_equals(e.data, 'shared');
    this.done();
  });
  shared.port.postMessage('shared');
}, 'shared');