//Title: Same-origin postMessage with targetOrigin == "/" 

import { MessageChannel } from '../../../js/MessagePassing/PostMessage/MessageChannel';
import { async_test, assert_array_equals  } from '../../../js/DOM/Events/Testharness';

const HTMLDocument = require('../../../js/DOM/Events/HTMLDocument');
const Window = require('../../../js/DOM/Events/Window');
const location = require('../../../js/MessagePassing/PostMessage/Location');

var description = "Test Description: " +
                      "To restrict the message to same-origin targets only, without needing to explicitly " +
                      "state the origin, set the target origin to '/'.";

var window = Window.getInstance();
var document = new HTMLDocument.HTMLDocument();
                      
                      
var iframe = document.createElement('iframe');
document.appendChild(iframe);

iframe.src = "ChildWindowPostMessage.js";

window.onload = PostMessageTest;

var t = async_test(description);

var DATA = "/";
var TARGET = document.querySelector("iframe");
var SORIGIN = location.protocol + "//" + location.host;
var ExpectedResult = [DATA, SORIGIN];
var ActualResult = [];

function PostMessageTest()
{
    TARGET.contentWindow.postMessage(DATA, "/");
}

window.onmessage = t.step_func(function(e)
{
    ActualResult.push(e.data, e.origin);
    assert_array_equals(ActualResult, ExpectedResult, "ActualResult");
    t.done();
});