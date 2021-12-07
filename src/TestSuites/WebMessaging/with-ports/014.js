//Title: structured clone vs reference</title>

import { MessageChannel } from '../../../js/MessagePassing/PostMessage/MessageChannel';
import { assert_equals, assert_not_equals, async_test } from '../../../js/DOM/Events/Testharness';
const Window = require('../../../js/DOM/Events/Window');
var window = Window.getInstance();

async_test(function(t) {
  var x = [];
  var y = [x,x];
  window.postMessage(y, '*', []);
  window.onmessage = t.step_func(function(e) {
    console.log('Got message. e.data[0] === e.data[1]? '+(e.data[0] === e.data[1]))
    assert_equals(e.data[0], e.data[1], 'e.data[0] === e.data[1]');
    assert_not_equals(e.data[0], x, 'e.data[0] !== x');
    t.done();
  });
});
