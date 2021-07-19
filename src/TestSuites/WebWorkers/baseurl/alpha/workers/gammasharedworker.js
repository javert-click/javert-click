const SharedWorkerInfo = require('../../../../../js/MessagePassing/WebWorkers/SharedWorker');
const SharedWorker = SharedWorkerInfo.SharedWorker;

console.log('Going to create shared worker');
var worker = new SharedWorker("subsharedworker.js");
console.log('Shared worker created');
worker.port.onmessage = function(e) {
  console.log('Worker: got message, sending back to main: '+e.data);
  postMessage(e.data);
}