//Title: resolving url with stuff in host-specific</title>

import { MessageChannel } from '../../../js/MessagePassing/WebMessaging/MessageChannel';
import { assert_equals, async_test } from '../../../js/DOM/Events/Testharness';
const location = require('../../../js/MessagePassing/WebMessaging/Location');
const Window = require('../../../js/DOM/Events/Window');
var window = Window.getInstance();

async_test(function() {
  window.postMessage('', location.protocol + '//' + location.host + '//');
  window.onmessage = this.step_func(function(e) {
    assert_equals(e.origin, location.protocol + '//' + location.host);
    this.done();
  });
});
