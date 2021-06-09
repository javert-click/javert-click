//Title: postMessage(): read-only ports array
import { MessageChannel } from '../../../js/MessagePassing/PostMessage/MessageChannel';
import { async_test, assert_equals, assert_throws } from '../../../js/DOM/Events/Testharness';

var TargetPort = null;
var description = "The postMessage() method - Make new ports into a read only array.";

var t = async_test("Test Description: " + description);

var channel = new MessageChannel();

TargetPort = channel.port2;
TargetPort.start();
TargetPort.addEventListener("message", t.step_func(TestMessageEvent), true);

var channel2 = new MessageChannel();

channel.port1.postMessage("ports", [channel2.port1]);

function TestMessageEvent(evt)
{
    var channel3 = new MessageChannel();
    console.log('expects the following to raise TypeError');
    assert_throws(new TypeError(), () => {
        evt.ports.push(channel3.port1);
    }, "ports is a frozen object");
    console.log('1st assert done!');
    assert_equals(evt.ports.length, 1, "ports is a read only array with length == 1.");
    console.log('Test done, evt.ports.length: '+evt.ports.length);
    t.done();
}