console.log('MAIN: creating worker');

var msg = "data"//symb(msg);
//var typMsg = typeof msg === 'object';
//JavertAssume(typMsg);

var operation = "op";

const worker = new WebworkerPromise(new Worker('operationsworker.js'));

console.log('Worker created');

// main.js
worker.exec(operation, msg)
.then(
  (response => {
    const prop = msg === response.PromiseResult;
    console.log('Got response from op: '+response.PromiseResult)
    JavertAssert(prop);
  })
);

//14m32.028s