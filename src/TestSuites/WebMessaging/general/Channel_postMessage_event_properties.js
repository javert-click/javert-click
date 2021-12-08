//Title: postMessage(): MessageEvent properties

import { MessageChannel } from '../../../js/MessagePassing/WebMessaging/MessageChannel';
import { MessageEvent } from '../../../js/DOM/Events/MessageEvent';
import { async_test, assert_array_equals } from '../../../js/DOM/Events/Testharness';

var TargetPort = null;
var description = "The postMessage() method - Create an event that uses the MessageEvent interface, "
                + "with the name message, which does not bubble and is not cancelable.";

var t = async_test("Test Description: " + description);

var channel = new MessageChannel();

TargetPort = channel.port2;
TargetPort.start();
TargetPort.addEventListener("message", t.step_func(TestMessageEvent), true);

channel.port1.postMessage("ping");

function TestMessageEvent(evt)
{
    console.log('Executing onmessage handler');
    var ExpectedResult = [true, "message", false, false];
    var ActualResult = [(evt instanceof MessageEvent), evt.type, evt.bubbles, evt.cancelable];
    console.log('ActualResult: '+ActualResult);
    assert_array_equals(ActualResult, ExpectedResult);
    console.log('Assert done!');
    t.done();
}