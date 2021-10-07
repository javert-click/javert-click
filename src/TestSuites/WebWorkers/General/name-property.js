//Title: Test the name property of shared and dedicated workers via the name constructor option

import { setup, fetch_tests_from_worker, done } from '../../../js/DOM/Events/Testharness';
const WorkerInfo = require('../../../js/MessagePassing/WebWorkers/Worker');
const SharedWorkerInfo = require('../../../js/MessagePassing/WebWorkers/SharedWorker');
const Worker = WorkerInfo.Worker;
const SharedWorker = SharedWorkerInfo.SharedWorker;

setup({explicit_done: true});

(async function() {
  const worker = new Worker("support/name.js", { name: "my name" });
  //await fetch_tests_from_worker(worker);

  const worker2 = new Worker("support/name-as-accidental-global.js");
  //await fetch_tests_from_worker(worker2);

  const sharedWorker = new SharedWorker("support/name.js", { name: "my name" });
  //await fetch_tests_from_worker(sharedWorker);

  const sharedWorker2 = new SharedWorker("support/name-as-accidental-global.js");
  //await fetch_tests_from_worker(sharedWorker2);

  done();
})();