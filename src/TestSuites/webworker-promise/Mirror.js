console.log('MAIN: creating worker');

const worker = new WebworkerPromise(new Worker('basicworker.js'));

var msg = symb(msg);
var isobj = typeof msg === 'object';
JavertAssume (isobj);

console.log('MAIN: posting message to worker');
worker.postMessage(msg)
.then((response) => {
    console.log('MAIN: Got message: '+response);
    assert_object_equals(response, msg);
})
.catch(err => {
    console.log('MAIN: Got error');
    JavertAssert(false)
});

console.log('MAIN: finsihed executing script')