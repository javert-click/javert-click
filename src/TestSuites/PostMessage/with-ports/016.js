//Title: origin of the script that invoked the method, data:
import { MessageChannel } from '../../../js/MessagePassing/PostMessage/MessageChannel';
import { assert_equals, assert_array_equals, async_test } from '../../../js/DOM/Events/Testharness';
const HTMLDocument = require('../../../js/DOM/Events/HTMLDocument');
const Window = require('../../../js/DOM/Events/Window');
const location = require('../../../js/MessagePassing/PostMessage/Location');
var window = Window.getInstance();
var document = new HTMLDocument.HTMLDocument();

var iframe = document.createElement('iframe');
document.appendChild(iframe);
iframe.src = "016-1.js";

async_test(function() {
  window.onmessage = this.step_func(function(e) {
    if (e.data === 'loaded') {
      window[0].postMessage('', '*');
      return;
    }

    assert_equals(e.data, location.protocol + '//' + location.host);
    assert_equals(e.origin, 'null');
    assert_array_equals(e.ports, []);
    this.done();
  });
  console.log('MAIN: done!');
});


