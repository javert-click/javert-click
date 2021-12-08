//Title: undefined as transferable</title>

import { assert_array_equals, async_test } from '../../../js/DOM/Events/Testharness';
import { MessageChannel } from '../../../js/MessagePassing/WebMessaging/MessageChannel';
const Window = require('../../../js/DOM/Events/Window');
var window = Window.getInstance();

async_test(function() {
  window.postMessage('', {transfer: undefined});
  window.onmessage = this.step_func(function(e) {
    console.log('Got message, e.ports: '+e.ports);
    assert_array_equals(e.ports, []);
    this.done();
  });
});
