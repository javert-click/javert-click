const WorkerPool = require('../../../MessagePassing/webworker-promise/src/pool');
const WorkerInfo = require('../../../MessagePassing/WebWorkers/Worker');
const Worker = WorkerInfo.Worker;

console.log('MAIN: going to create worker pool');

const pool = WorkerPool.create({
    src: 'worker.js',
    // or
    create: () => { console.log('Creating worker!'); return new Worker('worker.js') },
    maxThreads: 3, // optional, default is 2, max numbers of workers to create if necessary
    maxConcurrentPerWorker: 2 // optional, default is 1
});

console.log('MAIN: posting message to pool');
pool.postMessage('hello')
.then(() => {
    console.log('result');
});

console.log('MAIN: finsihed executing script')