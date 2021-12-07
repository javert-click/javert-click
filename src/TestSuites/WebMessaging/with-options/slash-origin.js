//Title: special value '/'

import { MessageChannel } from '../../../js/MessagePassing/PostMessage/MessageChannel';
import { assert_equals, async_test } from '../../../js/DOM/Events/Testharness';
const Window = require('../../../js/DOM/Events/Window');
var window = Window.getInstance();

async_test(function() {
  window.postMessage('', {targetOrigin: '/'});
  window.onmessage = this.step_func(function(e) {
    assert_equals(e.data, '');
    this.done();
  });
});
