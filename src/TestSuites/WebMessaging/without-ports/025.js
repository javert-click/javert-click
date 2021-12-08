//Title: MessagePort constructor properties

import { MessageChannel } from '../../../js/MessagePassing/WebMessaging/MessageChannel';
import { MessagePort } from '../../../js/MessagePassing/WebMessaging/MessagePort';
import { Worker } from '../../../js/MessagePassing/WebWorkers/Worker';
import { test, assert_true, assert_throws } from '../../../js/DOM/Events/Testharness';

test(function() {
   var ch = new MessageChannel();
   var x = ch.port1 instanceof MessagePort;
   assert_true(ch.port1 instanceof MessagePort, "MessageChannel's port not an instance of MessagePort");
   console.log('assert true? '+x);
   assert_throws(new TypeError(), /**@id minitest */ function () { var p = new MessagePort();}, "MessagePort is [[Callable]]");
   console.log('Finished assert_throws!');
});
var w = new Worker("025-1.js");
