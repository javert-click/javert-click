console.log('MAIN: going to create worker pool');

var maxthreads = symb_number(maxthreads);

var maxthreadsbounds = maxthreads > 0 && maxthreads < 3;
console.log('Going to do assume');
JavertAssume (maxthreadsbounds);
console.log('assume done');

var msg = "message";//symb_string(msg);
console.log('Going to create pool');
const pool = WorkerPool.create({
    src: 'poolworker.js',
    // or
    create: () => { return new Worker('poolworker.js') },
    maxThreads: maxthreads // optional, default is 2, max numbers of workers to create if necessary
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

/*pool.postMessage(msg)
.then(() => {
    console.log('finished 3rd message, pool length: '+pool._workers.length);
    var poolLimit = pool._workers.length <= maxthreads;
    JavertAssert (poolLimit);
});*/

/*
Time:
real	17m31.478s
user	16m35.943s
sys	0m8.038s

Failing Models:
[(maxthreads: 0), (msg: "")], [(maxthreads: 0), (msg: #msg)], [(maxthreads: 0.5), (msg:"")], [(maxthreads: 0.5), (msg: #msg)]
*/

console.log('MAIN: finsihed executing script')