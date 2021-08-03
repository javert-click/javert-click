const Worker = require('../../../../MessagePassing/WebWorkers/Worker');

Worker = Worker.Worker;

var msg = symb(msg);
var etyp = typeof msg === 'object';
JavertAssume (etyp);

var w = new Worker('EvalExprWorker.js');

w.postMessage(msg);

w.onmessage = function(e){
   console.log('MAIN: w.onmessage');
   var res = e.data;
   var check = (res.status === 'SUCCESS'); 
   JavertAssert (check)
}
