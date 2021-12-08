//Title: MessageChannel: port message queue is initially disabled

import { MessageChannel } from '../../../js/MessagePassing/WebMessaging/MessageChannel';
import { async_test } from '../../../js/DOM/Events/Testharness';

async_test(function(t) {
    var channel = new MessageChannel();
    channel.port2.addEventListener("message", t.unreached_func(), true);
    console.log('Going to call postMessage');
    channel.port1.postMessage("ping");
    setTimeout(t.step_func_done(), 100);
    console.log('Finished test');
});