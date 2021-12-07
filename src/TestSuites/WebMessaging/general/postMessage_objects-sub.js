//Title: postMessage with nested objects

import { MessageChannel } from '../../../js/MessagePassing/PostMessage/MessageChannel';
import { async_test, assert_equals, assert_object_equals  } from '../../../js/DOM/Events/Testharness';

const HTMLDocument = require('../../../js/DOM/Events/HTMLDocument');
const Window = require('../../../js/DOM/Events/Window');
const location = require('../../../js/MessagePassing/PostMessage/Location');

var description = "Test Description: Messages can be structured objects, e.g., nested objects.";

var window = Window.getInstance();
var document = new HTMLDocument.HTMLDocument();
                      
                      
var iframe = document.createElement('iframe');
document.appendChild(iframe);

iframe.src = "ChildWindowPostMessage.js";

window.onload = PostMessageTest;

var t = async_test(description);

var DATA = {foo: {bar: "wow"}};
var TYPE = "object";
var TARGET = document.querySelector("iframe");

function PostMessageTest()
{
    TARGET.contentWindow.postMessage(DATA, "*");
}

window.onmessage = t.step_func(function(e)
{
    assert_equals(typeof(e.data), TYPE);
    assert_equals(typeof(e.data.foo), TYPE);
    assert_object_equals(e.data, DATA);
    t.done();
});