// Title: just one argument</title>

import { assert_equals, test } from '../../../js/DOM/Events/Testharness';
import { MessageChannel } from '../../../js/MessagePassing/PostMessage/MessageChannel';
const Window = require('../../../js/DOM/Events/Window');
var window = Window.getInstance();

test(function() {
  console.log('window.postMessage: '+window.postMessage);
  window.postMessage('');
  window.onmessage = this.step_func(function(e) {
    console.log('Got message, data: '+e.data);
    assert_equals(e.data, '');
    this.done();
  });
});
