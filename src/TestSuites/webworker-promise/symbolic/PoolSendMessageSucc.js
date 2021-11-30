console.log('MAIN: going to create worker pool');

var msg = symb_string(msg);

console.log('Going to create pool');
const pool = WorkerPool.create({
    src: 'poolworker.js',
    create: () => { return new Worker('poolworker.js') },
    //maxThreads: maxthreads // optional, default is 2, max numbers of workers to create if necessary
});


//var constr_msg = typeof msg === 'object';
//JavertAssume(constr_msg);

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

/*Failing Model:
	[(#msg: null)]

 STATISTICS 
 ========== 

Executed commands: 374723

real	2m28.875s
user	2m17.832s
sys	0m2.811s*/


console.log('MAIN: finsihed executing script')