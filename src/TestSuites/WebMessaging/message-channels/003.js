// Title: onmessage implied start()

import { MessageChannel } from '../../../js/MessagePassing/PostMessage/MessageChannel';
import { assert_unreached, async_test } from '../../../js/DOM/Events/Testharness';

async_test(function(t) {
  var channel = new MessageChannel();
  channel.port1.postMessage(1);
  channel.port2.onmessage = function() {
    console.log('executing 1st handler of channel.port2');
    setTimeout(t.step_func(function() {
      console.log('going to call done!');
      t.done();
    }), 50);
    channel.port2.onmessage = t.step_func(function() {
      console.log('Test failed!')
      assert_unreached();
    });
  }; // implies start()
});
