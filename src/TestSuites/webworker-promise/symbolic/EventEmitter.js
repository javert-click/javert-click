const WebworkerPromiseInfo = require('../../../js/MessagePassing/webworker-promise/src/index');
const WebworkerPromise = WebworkerPromiseInfo.WebworkerPromise;
const WorkerInfo = require('../../../js/MessagePassing/WebWorkers/Worker');
const Worker = WorkerInfo.Worker;
const PromiseInfo = require('../../../js/Promises/Promise');
const Promise = PromiseInfo.Promise;

console.log('MAIN: creating worker');

var n1 = symb_number(n1);
var n2 = symb_number(n2);

function onPromise(worker, eventName) {
    return new Promise((res, rej) => {
      worker.on(eventName, function(){
          res.apply(null, arguments);
      })
    });
}

const worker = new WebworkerPromise(new Worker('emitterworker.js'));

console.log('Worker created');

const resultPromise = onPromise(worker, 'bar:result');
worker.emit('bar', n1, n2)

resultPromise.then(function(res){
    var resIsCorrect = res === n1 + n2;
    JavertAssert(resIsCorrect);
});

