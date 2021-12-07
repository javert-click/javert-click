// worker.js
RegisterPromise(
/*
* @id workerhandler
*/
(message, emit) => {
  //message - ping
  console.log('WORKER: received message '+message);
  return message;
});
console.log('WORKER: Finished executing script');