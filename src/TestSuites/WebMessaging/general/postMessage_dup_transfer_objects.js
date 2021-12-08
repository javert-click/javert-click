//Title: postMessage with duplicate transfer objects raises DataCloneError exception

import { MessageChannel } from '../../../js/MessagePassing/WebMessaging/MessageChannel';
import { test, assert_throws_dom, assert_own_property  } from '../../../js/DOM/Events/Testharness';

const HTMLDocument = require('../../../js/DOM/Events/HTMLDocument');
const Window = require('../../../js/DOM/Events/Window');

var description = "Test Description: " +
                      "postMessage with duplicate transfer objects raises DataCloneError exception.";

var window = Window.getInstance();
var document = new HTMLDocument.HTMLDocument();
                      
                      
var iframe = document.createElement('iframe');
document.appendChild(iframe);

iframe.src = "ChildWindowPostMessage.js";

window.onload = PostMessageTest;

var DATA = "ports";
var TARGET = document.querySelector("iframe");

function PostMessageTest()
{
    test(function()
    {
        assert_throws_dom("DATA_CLONE_ERR", TARGET.contentWindow.DOMException, function()
        {
            assert_own_property(window, "MessageChannel", "window");
            var channel = new MessageChannel();
            TARGET.contentWindow.postMessage(DATA, "*", [channel.port1, channel.port1]);
        });
    }, description);
}