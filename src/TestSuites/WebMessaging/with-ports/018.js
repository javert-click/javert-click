//Title: origin of the script that invoked the method, javascript

import { MessageChannel } from '../../../js/MessagePassing/PostMessage/MessageChannel';
import { assert_equals, assert_array_equals, async_test } from '../../../js/DOM/Events/Testharness';
const HTMLDocument = require('../../../js/DOM/Events/HTMLDocument');
const Window = require('../../../js/DOM/Events/Window');
const location = require('../../../js/MessagePassing/PostMessage/Location');
var window = Window.getInstance();
var document = new HTMLDocument.HTMLDocument();

var iframe = document.createElement('iframe');
document.appendChild(iframe);

async_test(function() {
  window[0].postMessage('', '*', []);
  window[0].onmessage = this.step_func(function(e) {
    assert_equals(e.origin, location.protocol + '//' + location.host);
    assert_array_equals(e.ports, []);
    this.done();
  });
});


