
//Title: postMessage(): clone a port 

import { MessageChannel } from '../../../js/MessagePassing/PostMessage/MessageChannel';
import { test, async_test, assert_equals, assert_not_equals } from '../../../js/DOM/Events/Testharness';

var OriginalPort = null;
var ClonedPort = null;
var description = "Test Description: When the user agent is to clone a port original port, with "
                    + "the clone being owned by owner, it must return a new MessagePort object";

var t = async_test("Test Description: " + description);

var ChannelA = new MessageChannel();
var ChannelB = new MessageChannel();
OriginalPort = ChannelB.port2;

ChannelA.port2.onmessage = t.step_func(function(evt)
{
    console.log('Executing ChannelA.port2.onmessage, evt.data? '+evt.data);
    if(evt.data == "ports")
    {
        ClonedPort = evt.ports[0];
        console.log('Do I have cloned port? '+ClonedPort);
        console.log('ClonedPort === OriginalPort? '+(ClonedPort === OriginalPort));
        assert_not_equals(ClonedPort, OriginalPort, "new cloned port object should not equal to the original port!");

        ClonedPort.onmessage = function(e)
        {
            console.log('Executing ClonedPort.onmessage');
            test(function(){ console.log('Got data: '+e.data); assert_equals(e.data, "ping"); }, "Data sent through remote port is received by the new cloned port");
            t.done();
        }
    }
});

ChannelA.port1.postMessage("ports", [OriginalPort]);
ChannelB.port1.postMessage("ping");