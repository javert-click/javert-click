
/*
* @id onmessagehandler
*/
onmessage = function(evt) {
    console.log('WORKER: Got message: '+evt.data);
    if (evt.data == "port") {
        if (evt.ports) {
            postMessage("PASS: Received message port");
            evt.ports[0].onmessage = pingBack;
            evt.ports[0].start();
        } else {
            postMessage("FAIL: Did not receive expected MessagePort");
        }
    } else if (evt.data == "noport") {
        if (!evt.ports || evt.ports.length) {
            postMessage("FAIL: Received message port or null ports array");
        } else {
            postMessage("PASS: evt.ports = [] as expected");
        }
    } else if (evt.data == "spam") {
        //for (var i = 0 ; i < 1000 ; i++) {
        for (var i = 0 ; i < 4 ; i++) {
            console.log('Worker: sending spam to main');
            evt.ports[0].postMessage(i);
        }
        postMessage("spamDone");
    } else if (evt.data == "getport") {
        const MessageChannel = require('../../../../js/MessagePassing/WebMessaging/MessageChannel');
        var channel = new MessageChannel.MessageChannel();
        postMessage("port", [channel.port1]);
        channel.port2.onmessage = pingBack;
        channel.port2.start();
    } else {
        postMessage("Unknown message:" + evt.data);
    }

}

function pingBack(evt) {
    // Make sure we got the expected data and send a return message over
    // the port.
    if (evt.data == "ping") {
        evt.target.postMessage("pong");
    } else {
        postMessage("FAIL: unknown message: " + evt.data);
    }
}

console.log('FINISHED EXECUTING WORKER SCRIPT');