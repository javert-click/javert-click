//console.log('MAIN: creating worker');

var input = 'input';

function onPromise(worker, eventName) {
    return new Promise((res, rej) => {
      worker.on(eventName, function(){
          res.apply(null, arguments);
      })
    });
}

const worker = new WebworkerPromise(new Worker('emitterworkeron.js'));

const resultPromise = onPromise(worker, 'op');
console.log('Main: going to emit event to worker');
var event = "event"//symb_string(event);
//var constr_event = (event === "add") || (event === "sub");
//JavertAssume(constr_event);

worker.emit(event, input)

resultPromise.then(function(res){
    console.log('MAIN: got result '+res+' from worker handler');
    var resIsCorrect = res === input;
    JavertAssert(resIsCorrect);
});


//var event = "event";//symb_string(event);
//console.log('ev created');
//var constr_ev = event.length >= 0 && event.length <= 20;
//console.log('going to assume');
//JavertAssume(constr_ev);
//console.log('assume done');

/*const resultPromise = onPromise(worker, 'op:result');
console.log('Main: going to emit event to worker');
worker.emit(event, input);
resultPromise.then(function(res){
    console.log('MAIN: got result from worker');
    debugger;
    var check = (event === res);
    JavertAssert(check);
});*/


/*worker.postMessage("request")
.then((op) => {
    const resultPromise = onPromise(worker, 'bar:result');
    console.log('Main: going to emit event to worker');
    worker.emit(op, input)

    resultPromise.then(function(res){
      console.log('MAIN: got result '+res+' from worker handler');
      var resIsCorrect = res === input;
      JavertAssert(resIsCorrect);
    });
})*/
//console.log('Worker created');



