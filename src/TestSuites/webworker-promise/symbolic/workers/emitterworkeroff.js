

console.log('Worker: executing script')

const host = RegisterPromise(async (data, emit) => {
  console.log('Worker received message '+data);
  //var sameop = op === data;
  //JavertAssume(sameop)
  //return op;
})

function handler(input){
    host.emit('op:result', input);
}

host.on('op', handler);
host.off('op', handler);

//.on(op, function(input) {
//  console.log('Worker: input: '+input);
//  host.emit('result:', input);
//});

console.log('Worker: finished executing script');