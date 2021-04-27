const Worker = require('../../../../MessagePassing/WebWorkers/Worker'); 
import { MessageChannel } from '../../../../MessagePassing/PostMessage/MessageChannel';

console.log('MAIN: Going to create worker')
var worker = new Worker.Worker('TransferBasicWorker.js');
var channel = new MessageChannel();
console.log('MAIN: worker created with id '+worker.__id);
console.log('MAIN: going to send message to worker with port '+channel.port2.__id);
worker.postMessage("MSG 1", [channel.port2]);
channel.port2.onmessage = function(e){
    console.log('MAIN (TRANSFERRED PORT): received message '+e.data);
};
channel.port1.postMessage('MAIN: port 1 is saying hello to port 2');
console.log('MAIN: message sent to worker');
worker.onmessage = function(e) { 
    console.log('MAIN: got message from worker: '+e.data);
};