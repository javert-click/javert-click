//Title: resolving a same origin targetOrigin with trailing slash</title>

import { MessageChannel } from '../../../js/MessagePassing/PostMessage/MessageChannel';
import { assert_equals, async_test } from '../../../js/DOM/Events/Testharness';
import { dummy_location } from '../stubs/Location';
const Window = require('../../../js/DOM/Events/Window');
var window = Window.getInstance();

var location = dummy_location;

async_test(function() {
  window.postMessage('', location.protocol + '//' + location.host + '/', []);
  window.onmessage = this.step_func(function(e) {
    assert_equals(e.data, '');
    this.done();
  });
});
