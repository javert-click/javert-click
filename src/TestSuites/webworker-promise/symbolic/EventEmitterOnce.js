//console.log('MAIN: creating worker');

var event = symb_string(event);
var input = "data";

function onPromise(worker, eventName) {
    return new Promise((res, rej) => {
      worker.on(eventName, function(){
          res.apply(null, arguments);
      })
    });
}

const worker = new WebworkerPromise(new Worker('emitterworkeronce.js'));

const count = 0;

worker.emit(event, input);
const resultPromise = onPromise(worker, 'op:result');
console.log('Main: going to emit event to worker');
worker.emit(event, input);
resultPromise.then(function(res){
    console.log('MAIN: got result from worker');
    JavertAssert(false);
});