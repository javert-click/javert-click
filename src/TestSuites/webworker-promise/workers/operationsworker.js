console.log('Worker: running script')

const host = RegisterPromise(async (msg) => {
    console.log('Worker: received msg '+msg);
    return msg;
})

var operation = symb_string(op);
var op_constr = operation.length > 0;
JavertAssume(op_constr);

host.operation(operation, function (message, emit) {
    console.log('Worker: handling operation, message: '+message);
    return message;
});

console.log('Worker: finished running script')