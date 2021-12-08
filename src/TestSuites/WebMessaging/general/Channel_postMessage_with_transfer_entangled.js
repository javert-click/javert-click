import { MessageChannel } from '../../../js/MessagePassing/WebMessaging/MessageChannel';
import { async_test, assert_equals, assert_not_equals } from '../../../js/DOM/Events/Testharness';

async_test(function(t) {
    var channel1 = new MessageChannel();
    var channel2 = new MessageChannel();

    // One, send a message.
    channel1.port1.postMessage(1);

    // Two, transfer both ports.
    channel2.port1.postMessage("transfer", [channel1.port1]);
    channel2.port1.postMessage("transfer", [channel1.port2]);

    var transfer_counter = 0;
    var sender;
    channel2.port2.onmessage = t.step_func(function (evt) {
        console.log('executing channel2.port2 handler');
        if (transfer_counter == 0) {
            sender = evt.ports[0];
            transfer_counter = 1;
            console.log('assigning sender and transfer_counter to '+evt.ports[0]+' and 1, respectively.');
        } else {
            sender.postMessage(2);
            var counter = 0;
            evt.ports[0].onmessage = t.step_func(function (evt) {
                console.log('executing evt.ports[0] handler');
                if (counter == 0) {
                    console.log('Going to assert that evt.data === 1?'+(evt.data === 1));
                    assert_equals(evt.data, 1);
                    counter = 1;
                } else if (counter == 1) {
                    console.log('Going to assert that evt.data === 2?'+(evt.data === 2));
                    assert_equals(evt.data, 2);
                    counter = 2;
                } else {
                    console.log('Going to assert that evt.data === 3?'+(evt.data === 3));
                    assert_equals(evt.data, 3);
                    t.done();
                }
            });
            sender.postMessage(3);
        }
    });
}, "An entangled port transferred to the same origin receives messages in order");