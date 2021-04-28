const Worker = require('../../../../MessagePassing/WebWorkers/Worker');
import { expectToEqual } from '../../../../../TestSuites/Jest';

var worker = new Worker.Worker('ErrWorker.js');
console.log('MAIN: worker created with id '+worker.__id);
console.log('MAIN: going to send message to worker');
var fun = function(){console.log('functions cannot be serialized!')};

var errs = 0;
try{
    worker.postMessage(fun);
} catch (e){
    console.log('MAIN: got error during postMessage: '+e);
    expectToEqual(e instanceof DataCloneError, true);
    errs++;
}
expectToEqual(errs, 1);
var msgs_received = 0;
worker.onmessage = function(e) { 
    console.log('MAIN: got result from worker:'+e.data);
    msgs_received++;
};
expectToEqual(msgs_received, 0);