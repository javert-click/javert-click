

console.log('Worker: executing script')
const registerWebworker = require('../../../../js/MessagePassing/webworker-promise/src/register');
const PromiseInfo = require('../../../../js/Promises/Promise');
const Promise = PromiseInfo.Promise;

var op2 = symb_string(op2);

const host = registerWebworker.RegisterPromise(async (data, emit) => {
  console.log('Worker received message '+data);
  return 'Ola';
})

.on(op2, function(n1, n2) {
  console.log('Worker: bar, numbers: '+n1+' and '+n2);
  host.emit('bar:result', n1 + n2);
});

console.log('Worker: finished executing script');