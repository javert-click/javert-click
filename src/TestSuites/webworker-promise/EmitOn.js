var input = 'input';

function onPromise(worker, eventName) {
    return new Promise((res, rej) => {
      worker.on(eventName, function(){
          res.apply(null, arguments);
      })
    });
}
var event = symb_string(event);
const worker = new WebworkerPromise(new Worker('emitterworkeron.js'));

const resultPromise = onPromise(worker, 'op');
console.log('Main: going to emit event to worker');
var event = symb_string(event);

worker.emit(event, input)

resultPromise.then(function(res){
    console.log('MAIN: got result '+res+' from worker handler');
    var resIsCorrect = res === input;
    JavertAssert(resIsCorrect);
});



