// worker.js
RegisterPromise(
/*
* @id workerhandler
*/
(message, emit) => {
  //message - ping
  console.log('WORKER: executing worker handler');
  return 'pong';
});
console.log('WORKER: Finished executing script');