// Title: postMessage(): target port and source port

import { MessageChannel } from '../../../js/MessagePassing/WebMessaging/MessageChannel';
import { async_test, assert_equals, assert_not_equals } from '../../../js/DOM/Events/Testharness';

var TARGET = null;
var SOURCE = null;
var description = "The postMessage() method - Let target port be the port with which source "
                + "port is entangled, if any.";

var t = async_test("Test Description: " + description);

var channel = new MessageChannel();
SOURCE = channel.port1;
TARGET = channel.port2;
TARGET.start();
console.log('Target port has id '+TARGET.__id);
TARGET.addEventListener("message", t.step_func(TestMessageEvent), true);

SOURCE.postMessage("ping");

function TestMessageEvent(evt)
{
    console.log('Event target has id '+evt.target.__id);
    console.log('Going to test if evt.target === target? '+(evt.target === TARGET));
    assert_equals(evt.target, TARGET);
    console.log('Going to test if evt.target !== SOURCE? '+(evt.target !== SOURCE));
    assert_not_equals(evt.target, SOURCE);
    console.log('TEST DONE');
    t.done();
}