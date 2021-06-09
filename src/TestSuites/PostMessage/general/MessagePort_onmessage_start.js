//Title: MessageChannel: port.onmessage enables message queue

import { MessageChannel } from '../../../js/MessagePassing/PostMessage/MessageChannel';
import { async_test } from '../../../js/DOM/Events/Testharness';

async_test(function(t) {
  var channel = new MessageChannel();
  channel.port2.onmessage = function (e){
      console.log('Got message '+e.data);
      t.step_func_done();
  }
  channel.port1.postMessage("ping");
  setTimeout(t.unreached_func(), 100);
  console.log('TEST DONE');
});