const WorkerPool = require('../../../MessagePassing/webworker-promise/src/pool');
const WorkerInfo = require('../../../MessagePassing/WebWorkers/Worker');
const Worker = WorkerInfo.Worker;

console.log('MAIN: going to create worker pool');

const pool = WorkerPool.create({
    src: 'worker.js',
    // or
    create: () => { console.log('Creating worker!'); return new Worker('worker.js') },
    maxThreads: 2.5, // optional, default is 2, max numbers of workers to create if necessary
    maxConcurrentPerWorker: 1 // optional, default is 1
});

console.log('MAIN: posting message to pool');
pool.postMessage('hello')
.then(() => {
    console.log('finished 1st message, pool length: '+pool._workers.length);
});
pool.postMessage('hello2')
.then(() => {
    console.log('finished 2nd message, pool length: '+pool._workers.length);
});
pool.postMessage('hello3')
.then(() => {
    console.log('finished 3rd message, pool length: '+pool._workers.length);
});
pool.postMessage('hello4')
.then(() => {
    console.log('finished 4th message, pool length: '+pool._workers.length);
});

console.log('MAIN: finsihed executing script')