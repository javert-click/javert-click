// Title: without start()

import { MessageChannel } from '../../../js/MessagePassing/PostMessage/MessageChannel';
import { assert_equals, async_test } from '../../../js/DOM/Events/Testharness';

async_test(function(t) {
  var channel = new MessageChannel();
  channel.port1.postMessage(1);
  var i = 0;
  channel.port2.addEventListener('message', function() { console.log('Test failed!'); i++; }, false);
  setTimeout(t.step_func(function() { console.log('checking if '+i+' is equal to 0'); assert_equals(i, 0); t.done();}), 50);
});
