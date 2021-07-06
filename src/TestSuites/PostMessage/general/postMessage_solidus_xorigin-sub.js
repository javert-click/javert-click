//Title: Cross-origin postMessage with targetOrigin == "/"

import { MessageChannel } from '../../../js/MessagePassing/PostMessage/MessageChannel';
import { async_test, assert_equals, assert_object_equals  } from '../../../js/DOM/Events/Testharness';

const HTMLDocument = require('../../../js/DOM/Events/HTMLDocument');
const Window = require('../../../js/DOM/Events/Window');

var description = "Test Description: " +
                      "If the targetOrigin argument is a single literal U+002F SOLIDUS character (/), and " +
                      "the Document of the Window object on which the method was invoked does not have the " +
                      "same origin as the entry script's document, then abort these steps silently.";

var window = Window.getInstance();
var document = new HTMLDocument.HTMLDocument();
                      
                      
var iframe = document.createElement('iframe');
document.appendChild(iframe);

iframe.src = "ChildWindowPostMessage.js";

window.onload = PostMessageTest;

var t = async_test(description);

var DATA = "NoExceptionRaised";
var TARGET = document.querySelector("iframe");

function PostMessageTest()
{
    try
    {
        TARGET.contentWindow.postMessage("/", "/");
        TARGET.contentWindow.postMessage(DATA, "*");
    }
    catch(ex)
    {
        TARGET.contentWindow.postMessage("ExceptionRaised", "*");
    }
}

window.onmessage = t.step_func(function(e)
{
    assert_equals(e.data, DATA, "e.data");
    t.done();
});