

console.log('Worker: executing script')


//console.log('assume done');

const host = RegisterPromise(async (data, emit) => {
  console.log('Worker received message '+data);
  //var sameop = op === data;
  //JavertAssume(sameop)
  //return op;
});

var e = symb_string(event);
//var bound = op.length >= 0 && op.length <= 20;
//console.log('going to do assume');
//JavertAssume(bound);

host.on(e, function (input) {
  host.emit('op', input);
})

//.on(op, function(input) {
//  console.log('Worker: input: '+input);
//  host.emit('result:', input);
//});

console.log('Worker: finished executing script');