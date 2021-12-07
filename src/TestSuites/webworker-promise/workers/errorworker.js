// worker.js
console.log('Worker: executing script')

RegisterPromise(function (message) {
    //console.log('Worker: got message '+message);
    throw new Error('myException!');
});
console.log('Worker: finished executing script')