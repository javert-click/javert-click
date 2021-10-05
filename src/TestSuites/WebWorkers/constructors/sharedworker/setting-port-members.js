//Title: setting members of worker.port

import { setup, assert_equals, test } from '../../../../js/DOM/Events/Testharness';

const SharedWorkerInfo = require('../../../../js/MessagePassing/WebWorkers/SharedWorker');
const SharedWorker = SharedWorkerInfo.SharedWorker;
const Window = require('../../../../js/DOM/Events/Window');
const window = Window.getInstance();

setup(() => {
  window.worker = new SharedWorker('#', '');
});

var worker = window.worker;
test(() => {
  worker.port.postMessage = 1;
  assert_equals(worker.port.postMessage, 1);
}, 'postMessage');
test(() => {
  worker.port.start = 1;
  assert_equals(worker.port.start, 1);
}, 'start');
test(() => {
  worker.port.close = 1;
  assert_equals(worker.port.close, 1);
}, 'close');
test(() => {
  const f = () => {};
  worker.port.onmessage = f;
  assert_equals(worker.port.onmessage, f, '() => {}');
  worker.port.onmessage = 1;
  assert_equals(worker.port.onmessage, null, '1');
  worker.port.onmessage = f;
  worker.port.onmessage = ';';
  assert_equals(worker.port.onmessage, null, '";"');
  worker.port.onmessage = f;
  var obj = {handleEvent:() => {}};
  worker.port.onmessage = obj;
  assert_equals(worker.port.onmessage, obj, '{handleEvent:() => {}}');
  worker.port.onmessage = f;
  worker.port.onmessage = null;
  assert_equals(worker.port.onmessage, null, 'null');
  worker.port.onmessage = f;
  worker.port.onmessage = undefined;
  assert_equals(worker.port.onmessage, null, 'undefined');
}, 'onmessage');
test(() => {
  worker.port.addEventListener = 1;
  assert_equals(worker.port.addEventListener, 1);
}, 'addEventListener');
test(() => {
  worker.port.removeEventListener = 1;
  assert_equals(worker.port.removeEventListener, 1);
}, 'removeEventListener');
test(() => {
  worker.port.despatchEvent = 1;
  assert_equals(worker.port.despatchEvent, 1);
}, 'despatchEvent');