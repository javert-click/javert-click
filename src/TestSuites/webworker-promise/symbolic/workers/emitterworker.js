

console.log('Worker: executing script')
const registerWebworker = require('../../../../js/MessagePassing/webworker-promise/src/register');
const PromiseInfo = require('../../../../js/Promises/Promise');
const Promise = PromiseInfo.Promise;

const host = registerWebworker.RegisterPromise(async (data, emit) => {
  console.log('Worker received message '+data);
  return 'Ola';
})
.on('bar', function(n1, n2) {
  console.log('Worker: bar, numbers: '+n1+' and '+n2);
  host.emit('bar:result', n1 + n2);
});

console.log('Worker: finished executing script');