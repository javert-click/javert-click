//Title: DedicatedWorker: WorkerOptions 'type'

import { promise_test, test, assert_equals, assert_throws_js } from '../../../js/DOM/Events/Testharness';
const WorkerInfo = require('../../../js/MessagePassing/WebWorkers/Worker');
const Worker = WorkerInfo.Worker;
const PromiseInfo = require('../../../js/Promises/Promise');
const Promise = PromiseInfo.Promise;

promise_test(() => {
  const worker = new Worker('resources/post-message-on-load-worker.js');
  return new Promise(resolve => worker.onmessage = resolve)
      .then(msg_event => assert_equals(msg_event.data, 'LOADED'));
}, 'Test worker construction with the default worker type.');


promise_test(() => {
  const worker = new Worker('resources/post-message-on-load-worker.js',
                            { type: 'classic' });
  return new Promise(resolve => worker.onmessage = resolve)
      .then(msg_event => assert_equals(msg_event.data, 'LOADED'));
}, 'Test worker construction with the "classic" worker type.');

promise_test(() => {
  const worker = new Worker('resources/post-message-on-load-worker.js',
                            { type: 'module' });
                            return new Promise(resolve => worker.onmessage = resolve)
      .then(msg_event => assert_equals(msg_event.data, 'LOADED'));
}, 'Test worker construction with the "module" worker type.');

test(() => {
  assert_throws_js(
      TypeError,
      () => {
        new Worker('resources/post-message-on-load-worker.js', { type: '' });
      },
      'Worker construction with an empty type should throw an exception');
}, 'Test worker construction with an empty worker type.');

test(() => {
  assert_throws_js(
      TypeError,
      () => {
        new Worker('resources/post-message-on-load-worker.js',
                   { type: 'unknown' });
      },
      'Worker construction with an unknown type should throw an exception');
}, 'Test worker construction with an unknown worker type.');
