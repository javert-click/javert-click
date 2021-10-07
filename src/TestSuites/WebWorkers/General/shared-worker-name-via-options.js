//Title: Test the name property of shared workers mixing constructor options and constructor strings

import { setup, assert_equals, done } from '../../../js/DOM/Events/Testharness';
const SharedWorkerInfo = require('../../../js/MessagePassing/WebWorkers/SharedWorker');
const SharedWorker = SharedWorkerInfo.SharedWorker;

setup({ single_test: true });

const name = "my name";

const worker1 = new SharedWorker("support/shared-name.js", { name });
worker1.port.onmessage = receiveMessage;

const worker2 = new SharedWorker("support/shared-name.js", { name });
worker2.port.onmessage = receiveMessage;

const worker3 = new SharedWorker("support/shared-name.js", name);
worker3.port.onmessage = receiveMessage;

let nextCounterExpected = 1;
function receiveMessage(e) {
  //const { counter, name: receivedName } = e.data; //ASSIGNMENT NOT SUPPORTED
  const counter = e.data.counter;
  const receivedName = e.data.name;

  assert_equals(receivedName, name);
  assert_equals(counter, nextCounterExpected);

  ++nextCounterExpected;
  if (nextCounterExpected === 4) {
    done();
  }
}