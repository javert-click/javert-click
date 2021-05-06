// Title: basic messagechannel test</title>

import { MessageChannel } from '../../../js/MessagePassing/PostMessage/MessageChannel';
import { assert_equals, async_test } from '../../../js/DOM/Events/Testharness';

async_test(function(t) {
  var channel = new MessageChannel();
  channel.port1.postMessage(1);
  channel.port2.onmessage = t.step_func(
    function(e) {
      console.log('Received message, e.data: '+e.data);
      assert_equals(e.data, 1);
      t.done();
    });
  channel.port2.start();
});
