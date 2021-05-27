const WebworkerPromise = require('../../../MessagePassing/webworker-promise/src/index');
const Worker = require('../../../MessagePassing/WebWorkers/Worker');
console.log('going to create worker');
var w = new Worker.Worker('worker.js');
const worker = new WebworkerPromise.WebworkerPromise(w);

console.log('MAIN: sending message to worker');

worker
  .postMessage('ping')
  .then((response) => {
    // handle response
    console.log('MAIN: Got response from worker: '+response);
  })
  .catch(err=> {
    // handle error
    console.log('MAIN: Got error '+err);
  });

  console.log('MAIN: finsihed executing script')