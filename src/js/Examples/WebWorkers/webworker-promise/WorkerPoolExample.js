const WorkerPool = require('../../../MessagePassing/webworker-promise/src/pool');
const WorkerInfo = require('../../../MessagePassing/WebWorkers/Worker');
const Worker = WorkerInfo.Worker;

console.log('MAIN: going to create worker pool');

const pool = WorkerPool.create({
    src: 'worker.js',
    // or
    create: () => { console.log('Creating worker!'); return new Worker('worker.js') },
    maxThreads: 2, // optional, default is 2, max numbers of workers to create if necessary
    maxConcurrentPerWorker: 1 // optional, default is 1
});

console.log('MAIN: posting message to pool');
pool.postMessage('hello')
.then(() => {
    console.log('result');
});
pool.postMessage('hello2')
.then(() => {
    console.log('result2');
});
pool.postMessage('hello3')
.then(() => {
    console.log('result3');
});

console.log('MAIN: finsihed executing script')