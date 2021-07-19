const WorkerInfo = require('../../../../../js/MessagePassing/WebWorkers/Worker');
const Worker = WorkerInfo.Worker;

var worker = new Worker("subworker.js");
worker.onmessage = function(e) {
  postMessage(e.data);
}