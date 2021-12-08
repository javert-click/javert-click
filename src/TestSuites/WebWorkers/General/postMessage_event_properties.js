//Title: postMessage(): MessageEvent properties

import { MessageChannel } from '../../../js/MessagePassing/WebMessaging/MessageChannel';
import { async_test, assert_equals, assert_false, assert_array_equals, assert_class_string } from '../../../js/DOM/Events/Testharness';

async_test(function(t) {
    var channel = new MessageChannel();
    var targetPort = channel.port2;
    targetPort.start();
    targetPort.addEventListener("message", t.step_func_done(function (evt) {
      // TODOMP: check how to set class attr for message event
      console.log('MessageEvent class: '+({}.toString.call(evt)));
      assert_class_string(evt, "MessageEvent");
      console.log('Evt.type: '+evt.type);
      assert_equals(evt.type, "message");
      console.log('Evt.bubbles: '+evt.bubbles);
      assert_false(evt.bubbles, "bubbles should be false");
      console.log('Evt.cancelable: '+evt.cancelable);
      assert_false(evt.cancelable, "cancelable should be false");
      console.log('Evt.data: '+evt.data);
      assert_equals(evt.data, "ping", "data");
      console.log('Evt.origin: '+evt.origin);
      assert_equals(evt.origin, "", "origin");
      console.log('Evt.lastEventId: '+evt.lastEventId);
      assert_equals(evt.lastEventId, "", "lastEventId");
      console.log('Evt.source: '+evt.source);
      assert_equals(evt.source, null, "source");
      console.log('Evt.ports: '+evt.ports);
      assert_array_equals(evt.ports, [], "ports");
    }), true);
    channel.port1.postMessage("ping");
  });