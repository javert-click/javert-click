import { async_test, assert_true, assert_equals  } from '../../../js/DOM/Events/Testharness';
const WorkerInfo = require('../../../js/MessagePassing/WebWorkers/Worker');
const Worker = WorkerInfo.Worker;
const BroadcastChannelInfo = require('../../../js/MessagePassing/WebMessaging/BroadcastChannel');
const BroadcastChannel = BroadcastChannelInfo.BroadcastChannel;
const MessageChannelInfo = require('../../../js/MessagePassing/WebMessaging/MessageChannel');
const MessageChannel = MessageChannelInfo.MessageChannel;

const Window = require('../../../js/DOM/Events/Window');
var window = Window.getInstance();
var self = window;

async_test(t => {
  console.log('Checking if MessageChannel in Self: '+("MessageChannel" in self));
  assert_true("MessageChannel" in self, "The browser must support MessageChannel");

  const channel = new MessageChannel();

  channel.port2.onmessage = t.step_func_done(e => {
    console.log('Checkinf if port handler isTrusted = true, '+e.isTrusted);
    assert_equals(e.isTrusted, true);
  });

  channel.port1.postMessage("ping");
}, "With a MessageChannel and its MessagePorts");

async_test(t => {
  console.log('Checking if BroadcastChannel in self: '+("BroadcastChannel" in self));
  assert_true("BroadcastChannel" in self, "The browser must support BroadcastChannel");

  const channel = new BroadcastChannel("channel name");

  channel.onmessage = t.step_func_done(e => {
    console.log('Checking isTrusted for bc handler: '+e.isTrusted);
    assert_equals(e.isTrusted, true);
  });

  console.log('MAIN: going to create worker');
  new Worker("MessageEvent-trusted-worker.js");
  console.log('MAIN: worker created');
}, "With a BroadcastChannel");

async_test(t => {
  window.onmessage = t.step_func_done(e => {
    console.log('Going to check if window handler event isTrusted is true: '+e.isTrusted);
    assert_equals(e.isTrusted, true);
  });

  window.postMessage("ping", "*");
}, "With window");