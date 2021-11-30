console.log('Worker: running script')

// worker.js
const host = RegisterPromise(async (msg) => {
    console.log('Worker: received msg '+msg);
    //op = msg;
    //handle postMessage
    return 'pong';
})

//debugger;

var op = symb_string(op);
var op_constr = op.length >= 0 && op.length <= 20;
JavertAssume(op_constr);

//debugger;

host.operation(op, async (message, emit) => {
    console.log('Worker: handling operation, message: '+message);
    return message;
});

console.log('Worker: finished running script')