const WorkerInfo = require('../../../../../js/MessagePassing/WebWorkers/Worker');
const Worker = WorkerInfo.Worker;

console.log('wORKER: location.hash?? '+location.hash);
if (location.hash == '#1') {
  var w2 = new Worker('003-multiple-worker.js#2');
  console.log('created worker with #2');
  w2.onmessage = function(e) {
    postMessage('1'+e.data);
  }
} else if (location.hash == '#2') {
  var w3 = new Worker('003-multiple-worker.js#3');
  console.log('created worker with #3');
  w3.onmessage = function(e) {
    postMessage('2'+e.data);
  }
} else {
  console.log('posting message 3');
  postMessage('3');
}