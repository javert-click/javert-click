console.log('MAIN: Going to initiliaze heap!');
var MP = initMessagePassing();
console.log('MAIN: Heap initialized!');
var Worker = MP.Worker.Worker;

var obj = { Title: 'Simples Assim', Artist: 'Lenine' };
var worker = new Worker('ObjectBasicWorker.js');
console.log('MAIN: worker created with id '+worker.__id);
console.log('MAIN: going to send message to worker');
worker.postMessage(obj);
console.log('MAIN: message sent to worker');
worker.onmessage = function(e) { 
    console.log('MAIN: got object from worker:');
    MP.ObjectUtils.print(e.data);
};