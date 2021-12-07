var input = "data";

function onPromise(worker, eventName) {
    return new Promise((res, rej) => {
      worker.on(eventName, function(){
          res.apply(null, arguments);
      })
    });
}
var event = symb_string(event);
const worker = new WebworkerPromise(new Worker('emitterworkeroff.js'));

const resultPromise = onPromise(worker, 'op:result');
console.log('Main: going to emit event to worker');
worker.emit(event, input);
resultPromise.then(function(res){
  console.log('MAIN: got result from worker');
  JavertAssert(false);
});