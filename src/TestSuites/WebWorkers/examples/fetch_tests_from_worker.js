import { fetch_tests_from_worker } from '../../../js/DOM/Events/Testharness';
const WorkerInfo = require('../../../js/MessagePassing/WebWorkers/Worker');
const Worker = WorkerInfo.Worker;

fetch_tests_from_worker(new Worker("fetch_tests_from_worker-worker.js"));