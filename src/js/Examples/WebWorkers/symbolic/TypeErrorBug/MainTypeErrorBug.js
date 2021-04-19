console.log('MAIN: Going to initiliaze heap!');
var MP = initMessagePassing();
console.log('MAIN: Heap initialized!');
var Worker = MP.Worker.Worker;

var obj = null;
var worker = new Worker('TypeErrorBugWorker.js');
var portworker = worker.port.__id;
console.log('MAIN: worker created with id '+worker.__id+' and port '+portworker);
console.log('MAIN: going to send message to worker');
worker.postMessage(obj);
console.log('MAIN: message sent to worker');
worker.onmessage = function(e) { console.log('MAIN: got result from worker:'+e.data)};