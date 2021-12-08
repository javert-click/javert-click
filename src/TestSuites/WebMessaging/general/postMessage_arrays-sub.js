//Title: postMessage with arrays

import { MessageChannel } from '../../../js/MessagePassing/WebMessaging/MessageChannel';
import { async_test, assert_equals, assert_array_equals  } from '../../../js/DOM/Events/Testharness';

const HTMLDocument = require('../../../js/DOM/Events/HTMLDocument');
const Window = require('../../../js/DOM/Events/Window');

var description = "Test Description: Messages can be structured objects, e.g., arrays.";

var window = Window.getInstance();
var document = new HTMLDocument.HTMLDocument();
                      
                      
var iframe = document.createElement('iframe');
document.appendChild(iframe);

iframe.src = "ChildWindowPostMessage.js";

window.onload = PostMessageTest;

var t = async_test(description);

var DATA = [1,2,3,4,5,6,7,8];
var TYPE = "object";
var TARGET = document.querySelector("iframe");

function PostMessageTest()
{
    TARGET.contentWindow.postMessage(DATA, "*");
}

window.onmessage = t.step_func(function(e)
{
    assert_equals(typeof(e.data), TYPE);
    assert_array_equals(e.data, DATA);
    t.done();
});