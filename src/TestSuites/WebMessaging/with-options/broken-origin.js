//Title: resolving broken url

import { MessageChannel } from '../../../js/MessagePassing/PostMessage/MessageChannel';
import { assert_throws_dom, test } from '../../../js/DOM/Events/Testharness';
const Window = require('../../../js/DOM/Events/Window');
var window = Window.getInstance();

test(function() {
  assert_throws_dom('SYNTAX_ERR', function() {
    window.postMessage('', {targetOrigin: 'http://foo bar'});
  }, 'should have failed to resolve');
});
