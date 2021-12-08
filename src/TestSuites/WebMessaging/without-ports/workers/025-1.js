import { MessageChannel } from '../../../../js/MessagePassing/WebMessaging/MessageChannel';
import { MessagePort } from '../../../../js/MessagePassing/WebMessaging/MessagePort';
import { test, assert_true, assert_throws, done } from '../../../../js/DOM/Events/Testharness';

test(function() {
  console.log('Worker:running test!');
  var ch = new MessageChannel();
  var x = ch.port1 instanceof MessagePort;
  console.log('Worker:Going to check if this is true: '+x);
  assert_true(ch.port1 instanceof MessagePort,
              "Worker MessageChannel's port not an instance of MessagePort");
}, "Worker MessageChannel's port should be an instance of MessagePort");

test(function() {
  assert_throws(new TypeError(), function() {
    new MessagePort()
  }, "MessagePort is [[Callable]]");
  console.log('Worker:Ran assert_throws');
}, "Worker MessagePort should not be [[Callable]]");

done();
