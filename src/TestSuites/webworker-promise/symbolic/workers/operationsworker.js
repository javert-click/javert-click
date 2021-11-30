console.log('Worker: running script')

// worker.js
const host = RegisterPromise(async (msg) => {
    console.log('Worker: received msg '+msg);
    //op = msg;
    //handle postMessage
    return msg;
})

//debugger;

var op = symb_string(op);
var op_constr = op.length >= 0 && op.length <= 5;
JavertAssume(op_constr);

//debugger;

host.operation(op, function (message, emit) {
    console.log('Worker: handling operation, message: '+message);
    return message;
});

console.log('Worker: finished running script')