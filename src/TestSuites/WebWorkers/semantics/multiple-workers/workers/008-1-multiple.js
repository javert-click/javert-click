const SharedWorkerInfo = require('../../../../../js/MessagePassing/WebWorkers/SharedWorker');
const SharedWorker = SharedWorkerInfo.SharedWorker;

console.log('IFrame: going to create SharedWorker');
var w1 = new SharedWorker('008-multiple-worker.js');
w1.port.onmessage = function(e) {
  console.log('IFrame: sending message 2');
  e.ports[0].postMessage(2);
}