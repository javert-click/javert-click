console.log('MAIN: going to create worker pool');

var msg = symb_string(msg);

console.log('Going to create pool');
const pool = WorkerPool.create({
    src: 'errorworker.js',
    create: () => { return new Worker('errorworker.js') }
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

console.log('MAIN: finsihed executing script')