//Title: postMessage(): MessageEvent properties

import { MessageChannel } from '../../../js/MessagePassing/PostMessage/MessageChannel';
import { assert_throws_js, assert_equals } from '../../../js/DOM/Events/Testharness';

async_test(function(t) {
  var channel = new MessageChannel();
  var targetPort = channel.port2;
  targetPort.start();
  targetPort.addEventListener("message", t.step_func_done(function(e) {
    var channel3 = new MessageChannel();
    assert_throws_js(TypeError, () => {
      e.ports.push(channel3.port1);
    }, "ports is a frozen object");
    assert_equals(e.ports.length, 1, "ports is a read only array with length == 1.");
  }), true);
  var channel2 = new MessageChannel();
  channel.port1.postMessage("ports", [channel2.port1]);
});