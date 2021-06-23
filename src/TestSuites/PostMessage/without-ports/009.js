//Title: zero arguments</title>

import { MessageChannel } from '../../../js/MessagePassing/PostMessage/MessageChannel';
import { test, assert_throws_js } from '../../../js/DOM/Events/Testharness';
const Window = require('../../../js/DOM/Events/Window');
var window = Window.getInstance();

test(function() {
  assert_throws_js(TypeError, function() {
    window.postMessage();
  });
  console.log('assert_throws finished execution');
});
