//Title: targetOrigin '*'

import { MessageChannel } from '../../../js/MessagePassing/WebMessaging/MessageChannel';
import { async_test, assert_equals } from '../../../js/DOM/Events/Testharness';
const Window = require('../../../js/DOM/Events/Window');
var window = Window.getInstance();

async_test(function() {
  window.postMessage('', '*');
  window.onmessage = this.step_func(function(e) {
    console.log('Got message, data: '+e.data);
    assert_equals(e.data, '');
    this.done();
  });
});

