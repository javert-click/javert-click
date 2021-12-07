

console.log('Worker: executing script')

const host = RegisterPromise(async (data, emit) => {
  console.log('Worker received message '+data);
})

function handler(input){
    host.emit('op:result', input);
}

var e = symb_string(event);

host.once(e, handler);

console.log('Worker: finished executing script');