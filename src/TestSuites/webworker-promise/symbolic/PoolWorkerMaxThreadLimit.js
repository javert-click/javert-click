const WorkerPool = require('../../../js/MessagePassing/webworker-promise/src/pool');
const WorkerInfo = require('../../../js/MessagePassing/WebWorkers/Worker');
const Worker = WorkerInfo.Worker;

console.log('MAIN: going to create worker pool');

var maxthreads = symb_number(maxthreads);

var maxthreadsbounds = maxthreads >= 0 && maxthreads <= 2;

//var maxconcurrency = symb_number(maxconcurrency);

//maxconcurrencybounds = maxconcurrency >= 0 && maxconcurrency <= 2;

JavertAssume (maxthreadsbounds);
//JavertAssume (maxconcurrencybounds);

var msg = symb_string(msg);

const pool = WorkerPool.create({
    src: 'poolworker.js',
    // or
    create: () => { return new Worker('poolworker.js') },
    maxThreads: maxthreads, // optional, default is 2, max numbers of workers to create if necessary
    maxConcurrentPerWorker: 0 // optional, default is 1
});

console.log('MAIN: posting message to pool');
pool.postMessage(msg)
.then(() => {
    console.log('finished 1st message, pool length: '+pool._workers.length);
    var poolLimit = pool._workers.length <= maxthreads;
    JavertAssert (poolLimit);
});
pool.postMessage(msg)
.then(() => {
    console.log('finished 2nd message, pool length: '+pool._workers.length);
    var poolLimit = pool._workers.length <= maxthreads;
    JavertAssert (poolLimit);
});
pool.postMessage(msg)
.then(() => {
    console.log('finished 3rd message, pool length: '+pool._workers.length);
    var poolLimit = pool._workers.length <= maxthreads;
    JavertAssert (poolLimit);
});

/*
Time:
real	17m31.478s
user	16m35.943s
sys	0m8.038s

Failing Models:
[(maxthreads: 0), (msg: "")], [(maxthreads: 0), (msg: #msg)], [(maxthreads: 0.5), (msg:"")], [(maxthreads: 0.5), (msg: #msg)]
*/

console.log('MAIN: finsihed executing script')