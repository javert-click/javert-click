// Title: targetOrigin '*'

import { assert_equals, async_test } from '../../../js/DOM/Events/Testharness';
import { MessageChannel } from '../../../js/MessagePassing/PostMessage/MessageChannel';
const Window = require('../../../js/DOM/Events/Window');
var window = Window.getInstance();

async_test(function() {
  window.postMessage('', '*', []);
  window.onmessage = this.step_func(function(e) {
    console.log('Got message, data: '+e.data);
    assert_equals(e.data, '');
    this.done();
  });
});
