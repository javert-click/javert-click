//Title: members of WorkerLocation

import { async_test, assert_equals } from '../../../../../js/DOM/Events/Testharness';
const WorkerInfo = require('../../../../../js/MessagePassing/WebWorkers/Worker');
const Worker = WorkerInfo.Worker;

async_test(function() {
  var worker = new Worker('returns-same-object-any-worker.js');
});