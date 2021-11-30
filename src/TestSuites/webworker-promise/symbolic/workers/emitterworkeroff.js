

console.log('Worker: executing script')

function constrainStringLength(e, a, b) {

  for (var i = a; i <= b; i++) {
    var constraint = e.length === i;
    JavertBranch(constraint);
  };

  var lb = a <= e.length; JavertAssume(lb);
  var ub = e.length <= b; JavertAssume(ub);
}

const host = RegisterPromise(async (data, emit) => {
  console.log('Worker received message '+data);
  //var sameop = op === data;
  //JavertAssume(sameop)
})

function handler(input){
    host.emit('op:result', input);
}
var e = symb_string(event);
//constrainStringLength(e, 5, 10);
//console.log('going to do assume');
//JavertAssume(bound);
//debugger;
host.on(e, handler);
host.off(e, handler);

//var op = symb_string(op);
//var bound = op.length >= 0 && op.length <= 20;
//console.log('going to do assume');
//JavertAssume(bound);

//.on(op, function(input) {
//  console.log('Worker: input: '+input);
//  host.emit('result:', input);
//});

console.log('Worker: finished executing script');