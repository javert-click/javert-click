//Title: postMessage with invalid targetOrigin raises SyntaxError exception

import { MessageChannel } from '../../../js/MessagePassing/PostMessage/MessageChannel';
import { async_test, test, assert_throws_dom  } from '../../../js/DOM/Events/Testharness';

const HTMLDocument = require('../../../js/DOM/Events/HTMLDocument');
const Window = require('../../../js/DOM/Events/Window');

var description = "Test Description: " +
                      "If the value of the targetOrigin argument is neither a single U+002A ASTERISK character (*), " +
                      "a single U+002F SOLIDUS character (/), nor an absolute URL, then throw a SyntaxError exception " +
                      "and abort the overall set of steps.";

var window = Window.getInstance();
var document = new HTMLDocument.HTMLDocument();
                      
                      
var iframe = document.createElement('iframe');
document.appendChild(iframe);

iframe.src = "ChildWindowPostMessage.js";

window.onload = PostMessageTest;

var t = async_test(description);

var DATA = "InvalidOrigin";
var TARGET = document.querySelector("iframe");

function PostMessageTest()
{
    test(function()
    {
        assert_throws_dom("SYNTAX_ERR", TARGET.contentWindow.DOMException, function()
        {
            TARGET.contentWindow.postMessage(DATA, DATA);
        });
    }, description);
}