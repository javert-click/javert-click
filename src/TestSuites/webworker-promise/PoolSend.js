console.log('MAIN: going to create worker pool');

var msg = symb_string(msg);

console.log('Going to create pool');
const pool = WorkerPool.create({
    src: 'poolworker.js',
    create: () => { return new Worker('poolworker.js') }
});

console.log('MAIN: posting message to pool');
pool.postMessage(msg)
.then((res) => {
    console.log('finished 1st message, pool length: '+pool._workers.length);
    var correctMsg = msg === res;
    JavertAssert (correctMsg);
})
.catch(() => {
    console.log('Got error from worker pool');
    JavertAssert(false)
});

console.log('MAIN: finsihed executing script')