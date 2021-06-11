import { MessageChannel } from '../../../js/MessagePassing/PostMessage/MessageChannel';
import { async_test, assert_equals, assert_not_equals } from '../../../js/DOM/Events/Testharness';

async_test(function(t) {
    var channel = new MessageChannel();
    var source = channel.port1;
    var target = channel.port2;
    target.start();
    target.addEventListener("message", t.step_func_done(function(e) {
      console.log('Going to check if e.target === target? '+(e.target === target));
      assert_equals(e.target, target);
      console.log('Going to check if e.target !== source? '+(e.target !== source));
      assert_not_equals(e.target, source);
    }), true);
    source.postMessage("ping");
});