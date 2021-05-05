const Worker = require('../../../../MessagePassing/WebWorkers/Worker');

console.log('MAIN: Going to initiliaze heap!');
console.log('MAIN: Heap initialized!');

//var n = 6;
var n = symb_number(n);
//var n_constraint = n > 0 && n < 3;
//JavertAssume(n_constraint);
var worker = new Worker.Worker('FibonacciWorker.js');
console.log('MAIN: worker created with id '+worker.__id);
console.log('MAIN: going to send message to worker');
worker.postMessage(n);
console.log('MAIN: message sent to worker');
worker.onmessage = function(e) { console.log('MAIN: got result from worker:'+e.data)};