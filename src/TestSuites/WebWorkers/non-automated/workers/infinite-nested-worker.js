const WorkerInfo = require('../../../../js/MessagePassing/WebWorkers/Worker');
const Worker = WorkerInfo.Worker;

postMessage(1);
var w = new Worker('infinite-nested-worker.js');
w.onmessage = function(e) {
  postMessage(e.data);
}