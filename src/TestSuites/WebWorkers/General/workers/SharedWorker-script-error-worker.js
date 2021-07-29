onconnect = function(event) {
    event.ports[0].onmessage = function(evt) { handleMessage(evt, event.ports[0]); };
};

function handleMessage(event, port) {
    if (event.data == "unhandledError") {
        // Generate an unhandled error.
        onerror = null;
        console.log('WORKER: received message '+event.data);
        setTimeout(function() {
            port.postMessage("SUCCESS: unhandled error generated");
        }, 100);
        generateError();  // Undefined function call
    } else if (event.data == "handledError") {
        console.log('WORKER: received message '+event.data);
        onerror = function() {
            port.postMessage("SUCCESS: error handled via onerror");
            return true;
        };
        generateError();  // Undefined function call
    } else {
        port.postMessage("FAIL: Got unexpected message: " + event.data);
    }
};