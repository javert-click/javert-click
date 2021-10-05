//Title: SharedWorker: WorkerOptions 'type'

import { promise_test, test, assert_equals, assert_throws_js } from '../../../js/DOM/Events/Testharness';
const SharedWorkerInfo = require('../../../js/MessagePassing/WebWorkers/SharedWorker');
const SharedWorker = SharedWorkerInfo.SharedWorker;
const PromiseInfo = require('../../../js/Promises/Promise');
const Promise = PromiseInfo.Promise;

promise_test(() => {
  const worker = new SharedWorker('resources/post-message-on-load-worker.js',
                                  'default');
  return new Promise(resolve => worker.port.onmessage = resolve)
      .then(msg_event => assert_equals(msg_event.data, 'LOADED'));
}, 'Test worker construction with the default worker type.');

promise_test(() => {
  const worker = new SharedWorker('resources/post-message-on-load-worker.js',
                                  { name: 'classic', type: 'classic' });
  return new Promise(resolve => worker.port.onmessage = resolve)
      .then(msg_event => assert_equals(msg_event.data, 'LOADED'));
}, 'Test worker construction with the "classic" worker type.');

promise_test(() => {
  const worker = new SharedWorker('resources/post-message-on-load-worker.js',
                                  { name: 'module', type: 'module' });
  return new Promise(resolve => worker.port.onmessage = resolve)
      .then(msg_event => assert_equals(msg_event.data, 'LOADED'));
}, 'Test worker construction with the "module" worker type.');

test(() => {
  assert_throws_js(
      TypeError,
      () => {
        new SharedWorker('resources/post-message-on-load-worker.js',
                         { name: 'blank', type : '' });
      },
      'Worker construction with an empty type should throw an exception');
}, 'Test worker construction with an empty worker type.');

test(() => {
  assert_throws_js(
      TypeError,
      () => {
        new SharedWorker('resources/post-message-on-load-worker.js',
                         { name: 'unknown', type : 'unknown' });
      },
      'Worker construction with an unknown type should throw an exception');
}, 'Test worker construction with an unknown worker type.');