//Title: infinite nested workers
const WorkerInfo = require('../../../js/MessagePassing/WebWorkers/Worker');
const Worker = WorkerInfo.Worker;

var worker = new Worker('infinite-nested-worker.js');
//var div = document.getElementsByTagName('div')[0];
var i = 0;
worker.onmessage = function(e) {
  //div.textContent = i++;
  i++;
  console.log('Main, i: '+i);
}