//Title: origin of the script that invoked the method, scheme/host/port

import { MessageChannel } from '../../../js/MessagePassing/PostMessage/MessageChannel';
import { async_test, assert_equals, assert_array_equals  } from '../../../js/DOM/Events/Testharness';

const HTMLDocument = require('../../../js/DOM/Events/HTMLDocument');
const Window = require('../../../js/DOM/Events/Window');
const location = require('../../../js/MessagePassing/PostMessage/Location');
const StringUtils = require('../../../js/Utils/StringUtils');

var window = Window.getInstance();

var document = new HTMLDocument.HTMLDocument();
window.document = document;
                      
                      
var iframe = document.createElement('iframe');
document.appendChild(iframe);

async_test(function(test) {
  window.onload = test.step_func(function() {
    window[0].postMessage('', StringUtils.toUpperCase(location.protocol) + '//' + StringUtils.toUpperCase(location.host) + '/', []);
    window[0].onmessage = test.step_func(function(e) {
      assert_equals(e.origin, location.protocol + '//' + location.host);
      assert_array_equals(e.ports, []);
      test.done();
    });
  });
});


