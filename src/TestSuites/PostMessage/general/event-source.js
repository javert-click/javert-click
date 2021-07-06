//Title: Same-origin: event.source returns the WindowProxy of the source window

import { MessageChannel } from '../../../js/MessagePassing/PostMessage/MessageChannel';
import { async_test, assert_equals, assert_array_equals  } from '../../../js/DOM/Events/Testharness';

const HTMLDocument = require('../../../js/DOM/Events/HTMLDocument');
const Window = require('../../../js/DOM/Events/Window');
const location = require('../../../js/MessagePassing/PostMessage/Location');

var description = "Test Description: Same-origin: event.source returns the WindowProxy of the source window.";

var window = Window.getInstance();
var document = new HTMLDocument.HTMLDocument();
window.document = document;
                      
                      
var iframe = document.createElement('iframe');
document.appendChild(iframe);

iframe.src = "ChildWindowPostMessage.js";

window.onload = PostMessageTest;

var t = async_test(description);

var DATA = "foo";
var TARGET = document.querySelector("iframe");
var SORIGIN = location.protocol + "//" + location.host;
var ExpectedResult = [SORIGIN, "AccessCookieAllowed"];
var ActualResult = [];

function PostMessageTest()
{
    console.log('Main: Sending message to IFrame');
    TARGET.contentWindow.postMessage(DATA, SORIGIN);
}

window.onmessage = t.step_func(function(e)
{
    try
    {
        var sdomainCookie = e.source.document.cookie;
        ActualResult.push(e.origin, "AccessCookieAllowed");
    }
    catch(ex)
    {
        ActualResult.push(e.origin, "AccessCookieDenied");
    }
    console.log('Going to compare e.source and TARGET.contentWindow, '+e.source === TARGET.contentWindow);
    assert_true(e.source === TARGET.contentWindow);
    assert_array_equals(ActualResult, ExpectedResult, "ActualResult");
    t.done();
});