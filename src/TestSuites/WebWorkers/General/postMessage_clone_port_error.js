//Title: postMessage(): cloning source port

import { MessageChannel } from '../../../js/MessagePassing/WebMessaging/MessageChannel';
import { test, assert_throws_dom } from '../../../js/DOM/Events/Testharness';

test(function() {
    var channel = new MessageChannel();
    channel.port1.start();
    console.log('Going to call assert_throws_dom');
    assert_throws_dom("DataCloneError", function() {
      channel.port1.postMessage("ports", [channel.port1]);
    });
    console.log('Finished test');
});