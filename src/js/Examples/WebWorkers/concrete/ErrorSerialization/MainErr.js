const Worker = require('../../../../MessagePassing/WebWorkers/Worker');
import { expectToEqual } from '../../../../../TestSuites/Jest'; 

var worker = new Worker.Worker('ErrWorker.js');
console.log('MAIN: worker created with id '+worker.__id);
console.log('MAIN: going to send message to worker');
var terr = new TypeError("Type is wrong");
worker.postMessage(terr);
console.log('MAIN: message sent to worker');
worker.onmessage = function(e) { 
    console.log('MAIN: got result from worker:'+e.data);
    expectToEqual(e.data instanceof ReferenceError, true);
    expectToEqual(e.data.name, "ReferenceError");
    expectToEqual(e.data.message, "opsss");
    console.log('TEST PASSED');
};