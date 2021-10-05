//Title: SharedWorker: import.meta

import { promise_test, assert_true } from '../../../js/DOM/Events/Testharness';
const SharedWorkerInfo = require('../../../js/MessagePassing/WebWorkers/SharedWorker');
const SharedWorker = SharedWorkerInfo.SharedWorker;
const PromiseInfo = require('../../../js/Promises/Promise');
const Promise = PromiseInfo.Promise;

/*promise_test(() => {
  const script_url = 'resources/import-meta-url-worker.js';
  const worker = new SharedWorker(script_url, { type: 'module' });
  return new Promise((resolve, reject) => {
        worker.port.onmessage = resolve;
        worker.onerror = (error) => reject(error && error.message);
      })
      .then(msg_event => assert_true(msg_event.data.indexOf(script_url) !== -1));
}, 'Test import.meta.url on the top-level module script.');*/

promise_test(() => {
  const script_url = 'import-meta-url-export.js';
  const worker = new SharedWorker(
      'resources/dynamic-import-given-url-worker.js',
      { type: 'module' });
  worker.port.postMessage('./' + script_url);
  return new Promise((resolve, reject) => {
        worker.port.onmessage = resolve;
        worker.onerror = (error) => reject(error && error.message);
      })
      .then(msg_event => assert_true(msg_event.data.indexOf(script_url) !== -1));
}, 'Test import.meta.url on the imported module script.');
/*
promise_test(() => {
  const script_url = 'import-meta-url-export.js';
  const worker = new SharedWorker(
      'resources/dynamic-import-given-url-worker.js',
      { type: 'module' });
  worker.port.postMessage('./' + script_url);

  return new Promise((resolve, reject) => {
        worker.port.onmessage = resolve;
        worker.onerror = (error) => reject(error && error.message);
      })
      .then(msg_event => assert_true(msg_event.data.indexOf(script_url) !== -1))
      .then(() => {
        worker.port.postMessage('./' + script_url + '#1');
        return new Promise(resolve => worker.port.onmessage = resolve);
      })
      .then(msg_event => assert_true(msg_event.data.indexOf(script_url) !== -1));
}, 'Test import.meta.url on the imported module script with a fragment.');*/