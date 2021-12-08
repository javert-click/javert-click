//Title: MessageEvent interface and properties

import { MessageChannel } from '../../../js/MessagePassing/WebMessaging/MessageChannel';
import { MessageEvent } from '../../../js/DOM/Events/MessageEvent';
import { async_test, assert_equals, assert_true, assert_false  } from '../../../js/DOM/Events/Testharness';

const HTMLDocument = require('../../../js/DOM/Events/HTMLDocument');
const Window = require('../../../js/DOM/Events/Window');

var window = Window.getInstance();
var document = new HTMLDocument.HTMLDocument();
window.document = document;
                      
                      
var iframe = document.createElement('iframe');
document.appendChild(iframe);

iframe.src = "ChildWindowPostMessage.js";

async_test(function() {
    window.do_test = this.step_func(function() {
        console.log('Main: sending message to IFrame');
        document.querySelector("iframe").contentWindow.postMessage("foo", "*");
    });

    window.addEventListener("message", this.step_func_done(function(e) {
        e.preventDefault();
        assert_true(e instanceof MessageEvent, "Should be MessageEvent");
        assert_equals(e.type, "message");
        assert_false(e.bubbles, "bubbles");
        assert_false(e.cancelable, "cancelable");
        assert_false(e.defaultPrevented, "defaultPrevented");
    }), false);
});
console.log('Main: setting window.onload to '+window.do_test);
window.onload = window.do_test;