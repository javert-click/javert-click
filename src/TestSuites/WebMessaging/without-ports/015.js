//Title: different origin

import { MessageChannel } from '../../../js/MessagePassing/WebMessaging/MessageChannel';
import { assert_unreached, async_test } from '../../../js/DOM/Events/Testharness';
const Window = require('../../../js/DOM/Events/Window');
var window = Window.getInstance();

async_test(function() {
  window.postMessage('', 'http://example.org', []);
  window.onmessage = this.step_func(function(e) {
    assert_unreached();
  });
  setTimeout(this.step_func(function(){ this.done(); }), 50);
});

