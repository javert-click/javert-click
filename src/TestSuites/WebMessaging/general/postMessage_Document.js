//Title: postMessage with Date object 

import { MessageChannel } from '../../../js/MessagePassing/WebMessaging/MessageChannel';
import { async_test, test, assert_throws_dom } from '../../../js/DOM/Events/Testharness';

const HTMLDocument = require('../../../js/DOM/Events/HTMLDocument');
const Window = require('../../../js/DOM/Events/Window');

var description = "Test Description: " +
"postMessage with Document object: Throw a DataCloneError if message could not be cloned.";

var t = async_test(description);

var window = Window.getInstance();
var document = new HTMLDocument.HTMLDocument();

var iframe = document.createElement('iframe');
document.appendChild(iframe);

console.log('document.__platform? '+document.__platform);

iframe.src = "ChildWindowPostMessage.js";

window.onload = PostMessageTest;

var DATA = document;
var TARGET = document.querySelector("iframe");

function PostMessageTest()
{
    test(function()
    {
        assert_throws_dom("DATA_CLONE_ERR", TARGET.contentWindow.DOMException, function()
        {
            TARGET.contentWindow.postMessage(DATA, "*");
        });
    }, description);
}