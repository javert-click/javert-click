//Title: Transferred objects are no longer usable on the sending side

import { MessageChannel } from '../../../js/MessagePassing/PostMessage/MessageChannel';
import { async_test, test, assert_array_equals, assert_own_property  } from '../../../js/DOM/Events/Testharness';

const HTMLDocument = require('../../../js/DOM/Events/HTMLDocument');
const Window = require('../../../js/DOM/Events/Window');

var description = "Test Description: " +
                      "Objects listed in transfer are transferred, not just cloned, meaning that they are " +
                      "no longer usable on the sending side.";

var t = async_test(description);

var window = Window.getInstance();
var document = new HTMLDocument.HTMLDocument();

var iframe = document.createElement('iframe');
document.appendChild(iframe);

iframe.src = "ChildWindowPostMessage.js";

var DATA = {test: "e.ports[0].postMessage('TRANSFERRED')"};
var TARGET = document.querySelector("iframe");
var ExpectedResult = ["PING", "TRANSFERRED"];
var ActualResult = [];

window.onload = PostMessageTest;

function PostMessageTest()
{
    test(function()
    {
        assert_own_property(window, "MessageChannel", "window");

        var channel = new MessageChannel();

        channel.port2.onmessage = t.step_func(VerifyResult);

        channel.port1.postMessage("PING");

        TARGET.contentWindow.postMessage(DATA, "*", [channel.port1]);

        channel.port1.postMessage("PONG");

    }, "MessageChannel is supported.");
}

function VerifyResult(e)
{
    ActualResult.push(e.data)

    if (ActualResult.length >= ExpectedResult.length)
    {
        assert_array_equals(ActualResult, ExpectedResult, "ActualResult");
        t.done();
    }
}