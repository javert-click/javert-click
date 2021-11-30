console.log('MAIN: going to create worker pool');

var msg = symb_string(msg);
//var constr_msg = typeof message === 'object';//msg.length >= 5 && msg.length <= 10;
//JavertAssume(constr_msg);

console.log('Going to create pool');
const pool = WorkerPool.create({
    src: 'errorworker.js',
    create: () => { return new Worker('errorworker.js') },
    //maxThreads: maxthreads // optional, default is 2, max numbers of workers to create if necessary
});

console.log('MAIN: posting message to pool');
var p = pool.postMessage(msg)
p.then(() => {
    console.log('Got no error');
    JavertAssert(false);
});
p.catch((err) => {
    console.log('err.message:'+err.message); // 'myException!'
    var errMsgIsCorrect = err.message === 'myException!';
    JavertAssert(errMsgIsCorrect);
});

/*STATISTICS 
 ========== 

Executed commands: 377745

real	2m3.774s
user	2m0.472s
sys	0m1.668s*/


console.log('MAIN: finsihed executing script')