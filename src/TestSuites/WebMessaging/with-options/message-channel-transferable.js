//Title: message channel as ports</title>

import { MessageChannel } from '../../../js/MessagePassing/WebMessaging/MessageChannel';
import { assert_equals, async_test } from '../../../js/DOM/Events/Testharness';
const Window = require('../../../js/DOM/Events/Window');
var window = Window.getInstance();

async_test(function(t) {
  var channel = new MessageChannel();
  window.postMessage('', {targetOrigin: '*', transfer: [channel.port1, channel.port2]});
  window.onmessage = t.step_func(function(e) {
    console.log('e.ports.length is equal to '+e.ports.length);
    assert_equals(e.ports.length, 2);
    t.done();
  });
}, "MessageChannel's ports as MessagePort objects");

