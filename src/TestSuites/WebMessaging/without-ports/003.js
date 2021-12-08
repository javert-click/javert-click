//Title: resolving 'example.org'

import { assert_throws_dom, test } from '../../../js/DOM/Events/Testharness';
import { MessageChannel } from '../../../js/MessagePassing/WebMessaging/MessageChannel';
const Window = require('../../../js/DOM/Events/Window');
var window = Window.getInstance();

test(function() {
  assert_throws_dom('SYNTAX_ERR', function() {
    window.postMessage('', 'example.org');
  }, 'targetOrigin is not an absolute url');
});
