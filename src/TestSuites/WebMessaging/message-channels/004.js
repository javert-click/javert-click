
//cross-document channel</title>

import { MessageChannel } from '../../../js/MessagePassing/WebMessaging/MessageChannel';
import { assert_equals, async_test } from '../../../js/DOM/Events/Testharness';
const HTMLDocument = require('../../../js/DOM/Events/HTMLDocument');
const Window = require('../../../js/DOM/Events/Window');
const location = require('../../../js/MessagePassing/WebMessaging/Location');
var window = Window.getInstance();
var document = new HTMLDocument.HTMLDocument();

var iframe1 = document.createElement('iframe');
var iframe2 = document.createElement('iframe');
document.appendChild(iframe1);
iframe1.appendChild(iframe2);
iframe1.src = "004-1.js";
iframe2.src = "004-2.js";

//TODO: window.onload!

async_test(
  function(t) {
    var channel = new MessageChannel();
    window[0].postMessage(1, '*', [channel.port1]);
    window[1].postMessage(2, '*', [channel.port2]);
    channel = null;
    window.onmessage = t.step_func(
      function(e) {
        console.log('MAIN: Got data:'+e.data);
        assert_equals(e.data, 1);
        t.done();
      });
  }
);
