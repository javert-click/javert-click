const Worker = require('../../../../MessagePassing/WebWorkers/Worker');
const ObjectUtils = require('../../../../Utils/ObjectUtils');
import { expectToEqual } from '../../../../../TestSuites/Jest'; 

var obj = { Title: 'Simples Assim', Artist: 'Lenine' };
console.log('MAIN: Going to create worker')
var worker = new Worker.Worker('ObjectBasicWorker.js');
console.log('MAIN: worker created with id '+worker.__id);
console.log('MAIN: going to send message to worker');
worker.postMessage(obj);
console.log('MAIN: message sent to worker');
worker.onmessage = function(e) { 
    console.log('MAIN: got object from worker:');
    var res = ObjectUtils.print(e.data);
    expectToEqual(res, "{ Artist: Lenine; Date: { Day: 27; Month: 8; Year: 2020; }; Title: Simples Assim; }");
    console.log("TEST PASSED");
};