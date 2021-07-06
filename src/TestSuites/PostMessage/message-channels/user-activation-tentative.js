//Title: user activation messagechannel test

import { MessageChannel } from '../../../js/MessagePassing/PostMessage/MessageChannel';
import { async_test, assert_equals, assert_false  } from '../../../js/DOM/Events/Testharness';

async_test(function(t) {
  var channel = new MessageChannel();
  channel.port1.postMessage(1, {includeUserActivation: true});
  channel.port1.postMessage(2);
  var expected_data = 1;
  channel.port2.onmessage = t.step_func(
    function(e) {
      assert_equals(e.data, expected_data);
      expected_data++;
      if (e.data == 1) {
        assert_false(e.userActivation.isActive);
        assert_false(e.userActivation.hasBeenActive);
      } else {
        assert_equals(e.userActivation, null);
        t.done();
      }
    });
  channel.port2.start();
});
