//Title: MessageEvent: onmessage infinite loop

import { MessageChannel } from '../../../js/MessagePassing/PostMessage/MessageChannel';
import { async_test, assert_less_than } from '../../../js/DOM/Events/Testharness';

// The test passes if the onmessage / postMessage loop does not prevent the
// step_timeout task from ever being run. In particular there should be no
// infinite loop or stack overflow.
async_test(function(t) {
  var channel = new MessageChannel();
  var count = 0;
  channel.port1.addEventListener("message", t.step_func(function() {
    count++;
    console.log('Assert: count < 1000? '+(count < 1000));
    assert_less_than(count, 1000, "There were many message events without " +
                                "t.step_timeout ever being called.");
  }));
  channel.port1.addEventListener("message", t.step_func(function() {
    channel.port2.postMessage(0);
  }));
  channel.port1.start();
  channel.port2.postMessage(0);

  t.step_timeout(function() { console.log('Finishing test'); t.done(); }, 0);
}, "onmessage calling source postMessage");

