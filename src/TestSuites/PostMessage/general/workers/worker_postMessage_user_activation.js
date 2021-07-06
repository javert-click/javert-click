console.log('Worker: Started executing script');
onmessage = (e) => { console.log('Worker: got message '+e.userActivation); postMessage(e.userActivation !== null) };
console.log('Worker: Finished executing script');