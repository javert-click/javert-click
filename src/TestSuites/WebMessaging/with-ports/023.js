// Title: null ports

import { assert_throws, test } from '../../../js/DOM/Events/Testharness';
import { MessageChannel } from '../../../js/MessagePassing/WebMessaging/MessageChannel';
const Window = require('../../../js/DOM/Events/Window');
var window = Window.getInstance();

test(function(t) {
  assert_throws(new TypeError(), () => window.postMessage('', '*', null));
  console.log('assert_throws finished execution');
});

