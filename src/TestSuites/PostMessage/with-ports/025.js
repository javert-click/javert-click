//Title: 1 as ports

import { assert_throws, test } from '../../../js/DOM/Events/Testharness';
import { MessageChannel } from '../../../js/MessagePassing/PostMessage/MessageChannel';
const Window = require('../../../js/DOM/Events/Window');
var window = Window.getInstance();

test(function() {
    assert_throws(new TypeError(), function() {
      window.postMessage('', '*', 1);
   });
   console.log('assert_throws finished execution');
});

