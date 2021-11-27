self.addEventListener('message', function(e) {
    console.log('Worker received message '+e.data);
    setTimeout(function () { postMessage(3); }, 15);
    setTimeout(function () { postMessage(2); }, 10);
    setTimeout(function () { postMessage(1); }, 5);
}, false);