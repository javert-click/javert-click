// worker.js
RegisterPromise(
/*
* @id workerhandler
*/
(message, emit) => {
  //message - ping
  console.log('WORKER: got msg: '+message);
  return message;
});
console.log('WORKER: Finished executing script');