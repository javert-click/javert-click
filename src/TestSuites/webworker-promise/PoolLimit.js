console.log('MAIN: going to create worker pool');

var maxthreads = symb_number(maxthreads);

var maxthreadsbounds = maxthreads > 0 && maxthreads < 3;
console.log('Going to do assume');
JavertAssume (maxthreadsbounds);
console.log('assume done');

var msg = "message";
console.log('Going to create pool');
const pool = WorkerPool.create({
    src: 'poolworker.js',
    // or
    create: () => { return new Worker('poolworker.js') },
    maxThreads: maxthreads // optional, default is 2, max numbers of workers to create if necessary
});

console.log('MAIN: posting message to pool');
pool.postMessage(msg);
pool.postMessage(msg)
.then(() => {
    console.log('finished 2nd message, pool length: '+pool._workers.length);
    var poolLimit = pool._workers.length <= maxthreads;
    JavertAssert (poolLimit);
});

console.log('MAIN: finsihed executing script')