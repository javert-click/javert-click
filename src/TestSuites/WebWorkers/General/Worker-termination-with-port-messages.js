//Title: This test terminates a worker when there are 
// many undelivered MessagePort messages still waiting 
// to be dispatched into the Worker Context. 
// This causes termination of JS execution and test should not try 
// to dispatch the remaining messages. Test succeeds if it does not hang or crash 
// (if worker thread is running in the separate process, that process could hang or crash).
import { Worker } from '../../../js/MessagePassing/WebWorkers/Worker';
import { MessageChannel } from '../../../js/MessagePassing/WebMessaging/MessageChannel';
import { async_test } from '../../../js/DOM/Events/Testharness';

async_test(function(t) {
    var worker = new Worker("Worker-termination-with-port-messages-worker.js");
    var channel = new MessageChannel();

    channel.port2.onmessage = function(evt)
    {
        // On first message back from worker, terminate it.
        console.log('MAIN: got message. Should be the last');
        worker.terminate();
        t.done();
    }
    channel.port2.start();

    worker.postMessage("", [channel.port1]);
    //TODOMP: upper bound was originally 1000. Changed to 10 to avoid performance issues.
    for (var i = 0; i < 10; i++)
        channel.port2.postMessage("message to worker");
});