// Title: message channel as ports

import { assert_throws, async_test, test, assert_equals } from '../../../js/DOM/Events/Testharness';
import { MessageChannel } from '../../../js/MessagePassing/PostMessage/MessageChannel';
const Window = require('../../../js/DOM/Events/Window');
var window = Window.getInstance();

async_test(function(t) {
  var channel = new MessageChannel();
  window.postMessage('', '*', [channel.port1, channel.port2]);
  window.onmessage = t.step_func(function(e) {
    console.log('Got message, number of ports transferred: '+e.ports.length);
    assert_equals(e.ports.length, 2);
    t.done();
  });
}, "MessageChannel's ports as MessagePort objects");

test(() => {
  var channel = new MessageChannel();
  channel[0] = channel.port1;
  channel[1] = channel.port2;
  channel.length = 2;
  assert_throws(new TypeError(),
                   () => { window.postMessage('', '*', channel) },
                   'Old-style WebIDL arrays must throw a type error');
  console.log('assert_throws finished execution');
}, "Old-style array objects");

