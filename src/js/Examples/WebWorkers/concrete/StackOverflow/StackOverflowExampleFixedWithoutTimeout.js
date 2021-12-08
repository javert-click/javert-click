import { assert_true } from '../../../../DOM/Events/Testharness';

const Worker         = require('../../../../MessagePassing/WebWorkers/Worker');
const Promise        = require('../../../../Promises/Promise');
const MessageChannel = require('../../../../MessagePassing/WebMessaging/MessageChannel');

Worker         = Worker.Worker;
Promise        = Promise.Promise;
MessageChannel = MessageChannel.MessageChannel;

var w = new Worker('worker_fixed_without_timeout.js');

var wf = async(op) => {
    // we create a new MessageChannel
    const channel = new MessageChannel();
    w.postMessage(op, [channel.port1]);

    return new Promise((res, rej) => { channel.port2.onmessage = res; });
};

(async()=>{
    var f1 = await wf("+1");
    console.log('Going to check if f1.data === 1');
    assert_true(f1.data === 1);
})();

(async()=>{
    var f2 = await wf("+2");
    console.log('Going to check if f2.data === 3');
    assert_true(f2.data === 3);
})();

