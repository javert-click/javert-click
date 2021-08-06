const WorkerPool = require('../../../js/MessagePassing/webworker-promise/src/pool');
const WorkerInfo = require('../../../js/MessagePassing/WebWorkers/Worker');
const Worker = WorkerInfo.Worker;

console.log('MAIN: going to create worker pool');

var maxconcurrency = symb_number(maxconcurrency);

var maxconcurrencybounds = maxconcurrency >= 0 && maxconcurrency <= 2;

JavertAssume (maxconcurrencybounds);

var msg = symb_string(msg);

const pool = WorkerPool.create({
    src: 'poolworker.js',
    // or
    create: () => { return new Worker('poolworker.js') },
    maxThreads: 1, // optional, default is 2, max numbers of workers to create if necessary
    maxConcurrentPerWorker: maxconcurrency // optional, default is 1
});

console.log('MAIN: posting message to pool');
pool.postMessage(msg)
.then(() => {
    console.log('finished 1st message, queue: '+pool._queue.length);
});

pool.postMessage(msg)
.then(() => {
    console.log('finished 2nd message, queue: '+pool._queue.length);
});
pool.postMessage(msg)
.then(() => {
    var queueLength = pool._queue.length === 0;
    JavertAssert (queueLength);
});

var expectedLength = 3 - (pool._maxThreads * maxconcurrency); 
var queueLength = expectedLength >= 0 ? pool._queue.length === expectedLength : pool._queue.length === 0;
JavertAssert (queueLength);

console.log('MAIN: finsihed executing script')

/*
Failing Models:
[(#maxconcurrency: 0.)], [(#maxconcurrency: 1.5)], [(#maxconcurrency: 0.5)]
*/