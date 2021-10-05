const WorkerInfo = require('../../../../../js/MessagePassing/WebWorkers/Worker');
const Worker = WorkerInfo.Worker;

if (location.hash == '#1') {
  var w2 = new Worker('003-worker.js#2');
  w2.onmessage = function(e) {
    postMessage('1'+e.data);
  }
} else if (location.hash == '#2') {
  var w3 = new Worker('003-worker.js#3');
  w3.onmessage = function(e) {
    postMessage('2'+e.data);
  }
} else {
  postMessage('3');
}