import { MessageChannel } from '../../../js/MessagePassing/PostMessage/MessageChannel';
import { async_test, assert_equals, assert_not_equals } from '../../../js/DOM/Events/Testharness';

async_test(function(t) {
  var channelA = new MessageChannel();
  var channelB = new MessageChannel();
  var originalPort = channelB.port2;
  channelA.port2.onmessage = t.step_func(function(e) {
    console.log('Executing channelA.port2 handler, e.data? '+e.data);
    assert_equals(e.data, "ports");
    var clonedPort = e.ports[0];
    console.log('1st assert: clonedPort !== originalPort? '+(clonedPort !== originalPort));
    assert_not_equals(clonedPort, originalPort, "new cloned port object should not equal to the original port!");
    clonedPort.onmessage = t.step_func_done(function(e) {
      console.log('Executing clonedPort handler, e.data: '+e.data);
      assert_equals(e.data, "ping", "Data sent through remote port is received by the new cloned port");
    });
  });
  channelA.port1.postMessage("ports", [channelB.port2]);
  channelB.port1.postMessage("ping");
});