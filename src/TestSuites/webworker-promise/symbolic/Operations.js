console.log('MAIN: creating worker');

var msg = "data"//symb(msg);
//var typMsg = typeof msg === 'object';
//JavertAssume(typMsg);

var op = symb_string(op);

const worker = new WebworkerPromise(new Worker('operationsworker.js'));

console.log('Worker created');

// main.js
worker.exec(op, msg)
.then((response) => {
    const prop = msg === response.PromiseResult;
    //debugger;
    console.log('Got response from op: '+response)
    JavertAssert(prop);
});

//14m32.028s