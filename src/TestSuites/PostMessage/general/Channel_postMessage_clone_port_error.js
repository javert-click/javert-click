
//Title: postMessage() DataCloneError: cloning source port

import { MessageChannel } from '../../../js/MessagePassing/PostMessage/MessageChannel';
import { test, assert_throws_dom } from '../../../js/DOM/Events/Testharness';

var description = "Test Description: Throw a DataCloneError if transfer array in postMessage contains source port.";

test(function()
{
    var channel = new MessageChannel();
    channel.port1.start();

    assert_throws_dom("DATA_CLONE_ERR", function()
    {
        console.log('Expects the following to throw DATA_CLONE_ERR');
        channel.port1.postMessage("ports", [channel.port1]);
        console.log('UNREACHED CODE');
    });
    console.log('Test DONE!');
}, description);