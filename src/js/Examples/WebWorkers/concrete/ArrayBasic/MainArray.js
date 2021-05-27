const Worker = require('../../../../MessagePassing/WebWorkers/Worker');

var arr = [1,2,3];
var worker = new Worker.Worker('ArrWorker.js');
console.log('MAIN: worker created with id '+worker.__id);
console.log('MAIN: going to send message to worker');
worker.postMessage(arr);
console.log('MAIN: message sent to worker');
worker.onmessage = function(e) { console.log('MAIN: got result from worker. 1st elem: '+e.data[0])};