

console.log('Worker: executing script')

const host = RegisterPromise(async (data, emit) => {
  console.log('Worker received message '+data);
});

var e = symb_string(event);

host.on(e, function (input) {
  host.emit('op', input);
})

console.log('Worker: finished executing script');