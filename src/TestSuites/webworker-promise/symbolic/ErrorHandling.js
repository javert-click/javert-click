// main.js
const WebworkerPromiseInfo = require('../../../js/MessagePassing/webworker-promise/src/index');
const WebworkerPromise = WebworkerPromiseInfo.WebworkerPromise;
const WorkerInfo = require('../../../js/MessagePassing/WebWorkers/Worker');
const Worker = WorkerInfo.Worker;

console.log('MAIN: creating worker');

var msg = symb_string(msg);

const worker = new WebworkerPromise(new Worker('errorworker.js'));
console.log('Main: worker created');
var p = worker.postMessage(msg);
p.then(function(msg){
  console.log('Main: Executin then clause')
  JavertAssert(false);
});

p.catch(function (err) {
  console.log('err.message:'+err.message); // 'myException!'
  var errMsgIsCorrect = err.message === 'myException!';
  JavertAssert(errMsgIsCorrect);
  console.log('err.stack:'+err.stack); // stack trace string
});