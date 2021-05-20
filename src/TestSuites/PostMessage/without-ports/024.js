// Title: Object cloning: throw an exception if function values encountered

import { MessageChannel } from '../../../js/MessagePassing/PostMessage/MessageChannel';
import { test, assert_throws_dom } from '../../../js/DOM/Events/Testharness';
const Window = require('../../../js/DOM/Events/Window');
var window = Window.getInstance();

test(function() {
  var obj = { f : function(){}};
  var ch = new MessageChannel();
  ch.port1.onmessage = function(){};
  ch.port2.start();
  assert_throws_dom('DATA_CLONE_ERR', function() { ch.port2.postMessage({obj: obj}); });
  console.log('Executed assert_throws_dom');
});
