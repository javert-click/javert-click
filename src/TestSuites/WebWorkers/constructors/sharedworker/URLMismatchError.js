//Title: Web Workers: SharedWorker - same name, different URL

import { setup, assert_equals } from '../../../../js/DOM/Events/Testharness';
const SharedWorkerInfo = require('../../../../js/MessagePassing/WebWorkers/SharedWorker');
const SharedWorker = SharedWorkerInfo.SharedWorker;

setup({ single_test: true });

let counter = 0
const maybeDone = () => {
  if(counter) {
    done()
  }
  counter++
}

const worker = new SharedWorker('shared-worker.js', 'name');
worker.port.postMessage("trigger a response")
worker.port.onmessage = e => {
  assert_equals(e.data, "ping")
  maybeDone()
}

// This used to throw "URLMismatchError", but the standard changed
const worker2 = new SharedWorker('1', 'name');
worker2.port.onmessage = e => {
  assert_array_equals(e.data, ["1", "name"])
  maybeDone()
}