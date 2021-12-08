//Title: postMessage() with a host object raises DataCloneError

import { MessageChannel } from '../../../js/MessagePassing/WebMessaging/MessageChannel';
import { test, assert_throws_dom } from '../../../js/DOM/Events/Testharness';

var description = "Throw a DataCloneError when a host object (e.g. a DOM node) is used with postMessage.";

test(function()
{
    var channel = new MessageChannel();
    channel.port1.start();
    assert_throws_dom("DATA_CLONE_ERR", function()
    {
        channel.port1.postMessage(navigator);
    });
}, description);