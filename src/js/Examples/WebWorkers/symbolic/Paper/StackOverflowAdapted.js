//import { assert_true } from '../../../../DOM/Events/Testharness';

const Worker = require('../../../../MessagePassing/WebWorkers/Worker');
const Promise = require('../../../../Promises/Promise');

Worker = Worker.Worker;
Promise = Promise.Promise;

//var exp1 = symb(exp1);
//var exp1typ = typeof exp1 === 'object';
//JavertAssume(exp1typ);
var exp1 = {name: 'IS_PRIME', number: 37};

//var exp2 = symb(exp2);
//var exp2typ = typeof exp2 === 'object';
//JavertAssume(exp2typ);
var exp2 = {name: 'FIBONACCI', number: 6};

console.log('Main: Going to create worker')
var w = new Worker('StackOverflowAdaptedWorker.js');
console.log('Main: worker created');

var wf = async(op) => {
    w.postMessage(op);

    return new Promise((res, rej) => { w.onmessage = res; });
};

(async function f(){
    console.log('MAIN: sending IS_PRIME msg');
    //var f1 = await wf({name: 'IS_PRIME', number: 5});
    var f1 = await wf(exp1);
    console.log('Number is prime? '+f1.data);
})();

(async function g(){
    console.log('MAIN: sending FIBONACCI msg');
    //var f2 = await wf({name: 'FIBONACCI', number: 5});
    var f2 = await wf(exp2);
    console.log('Fibonacci of 6 is '+f2.data);
})();

