//Title: postMessage with Date object 

import { MessageChannel } from '../../../js/MessagePassing/PostMessage/MessageChannel';
import { async_test, assert_equals, assert_not_equals } from '../../../js/DOM/Events/Testharness';

const HTMLDocument = require('../../../js/DOM/Events/HTMLDocument');
const Window = require('../../../js/DOM/Events/Window');

var description = "Test Description: Messages can contain JavaScript values (e.g., Dates).";

var t = async_test(description);

var window = Window.getInstance();
var document = new HTMLDocument.HTMLDocument();

var iframe = document.createElement('iframe');
document.appendChild(iframe);
iframe.src = "ChildWindowPostMessage.js";


var DATA = new Date();
var TYPE = "object";
var TARGET = document.querySelector("iframe");

window.onload = PostMessageTest;

function PostMessageTest()
{
    TARGET.contentWindow.postMessage(DATA, "*");
}

window.onmessage = t.step_func(function(e)
{
    assert_equals(typeof(e.data), TYPE);
    assert_equals(e.data.valueOf(), DATA.valueOf());
    assert_not_equals(e.data, DATA, "Object is cloned");
    t.done();
});