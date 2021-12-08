console.log('MAIN: creating worker');

var msg = "data";

var op = symb_string(op);

const worker = new WebworkerPromise(new Worker('operationsworker.js'));

console.log('Worker created');

worker.exec(op, msg)
.then((response) => {
    const prop = msg === response;
    //debugger;
    console.log('Got response from op: '+response)
    JavertAssert(prop);
});