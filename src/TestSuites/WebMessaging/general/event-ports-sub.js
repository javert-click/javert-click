//Title: event.ports returns the MessagePort array sent with the message

import { MessageChannel } from '../../../js/MessagePassing/PostMessage/MessageChannel';
import { MessagePort } from '../../../js/MessagePassing/PostMessage/MessagePort';
import { async_test, test, assert_equals, assert_true, assert_own_property } from '../../../js/DOM/Events/Testharness';

const HTMLDocument = require('../../../js/DOM/Events/HTMLDocument');
const Window = require('../../../js/DOM/Events/Window');

var description = "Test Description: event.ports returns the MessagePort array sent with the message.";

var window = Window.getInstance();
var document = new HTMLDocument.HTMLDocument();

var iframe = document.createElement('iframe');
document.appendChild(iframe);
iframe.src = "ChildWindowPostMessage.js";

var t = async_test(description);

var DATA = {test: "e.source.postMessage(e.ports.toString(), '*', e.ports)"};
var TARGET = document.querySelector("iframe");
var ExpectedResult = "";

console.log('Do I have target? '+TARGET);

window.onload = PostMessageTest;

function PostMessageTest()
{
    console.log('Inside PostMessageTest, do I have target? '+TARGET);
    test(function()
    {
        console.log('Again, window.MessageChannel? '+window.MessageChannel);
        assert_own_property(window, "MessageChannel", "window");

        var channel = new MessageChannel();
        var ports = [channel.port1, channel.port2];
        ExpectedResult = ports.toString();
        console.log('MAIN: posting message to IFrame, target: '+TARGET);
        TARGET.contentWindow.postMessage(DATA, "*", ports);

    }, "MessageChannel is supported.");
}

window.onmessage = t.step_func(function(e)
{
    console.log('MAIN: got message '+e.data);
    assert_equals(e.data, ExpectedResult, "e.data");
    assert_true(e.ports[0] instanceof MessagePort, e.ports[0] + " instanceof MessageChannel");
    assert_true(e.ports[1] instanceof MessagePort, e.ports[1] + " instanceof MessageChannel");
    t.done();
});

console.log('Finished main script');