//Title: postMessage with Function object

import { MessageChannel } from '../../../js/MessagePassing/PostMessage/MessageChannel';
import { async_test, test, assert_own_property, assert_equals  } from '../../../js/DOM/Events/Testharness';

const HTMLDocument = require('../../../js/DOM/Events/HTMLDocument');
const Window = require('../../../js/DOM/Events/Window');

var description = "Test Description: " +
                      "postMessage with Function object: Throw a DataCloneError if message could not be cloned.";

var t = async_test(description);

var window = Window.getInstance();
var document = new HTMLDocument.HTMLDocument();


var iframe = document.createElement('iframe');
document.appendChild(iframe);

iframe.src = "ChildWindowPostMessage.js";

window.onload = PostMessageTest;

var TOTALPORTS = 4; //100
var LocalPorts = [];
var RemotePorts = [];
var PassedResult = 0;
var sum = 0;
var TARGET = document.querySelector("iframe").contentWindow;

function PostMessageTest()
{
    test(function()
    {
        assert_own_property(window, "MessageChannel", "window");

        var channels = [];

        for (var i=0; i<TOTALPORTS; i++)
        {
            channels[i] = new MessageChannel();
            LocalPorts[i] = channels[i].port1;
            LocalPorts[i].foo = i;
            RemotePorts[i] = channels[i].port2;

            LocalPorts[i].onmessage = t.step_func(function(e)
            {
                console.log('LocalPorts[i].onmessage, e.data: '+e.data);
                assert_equals(e.target.foo, e.data);

                PassedResult++;
                sum += e.data;

                if (PassedResult == TOTALPORTS)
                {
                    console.log('PassedResult === TOTALPORTS, sum: '+sum);
                    assert_equals(sum, 6);
                    //assert_equals(sum, 4950);
                    t.done();
                }
            });
        }
        console.log('Main: sending RemotePorts to iframe');

        TARGET.postMessage("ports", "*", RemotePorts);

    }, "MessageChannel is supported.");
}

window.onmessage = function(e)
{
    console.log('Main: window.onmessage, data: '+e.data);
    if (e.data === "ports")
    {
        for (var i=0; i<TOTALPORTS; i++)
        {
            console.log('Main: sendimg message from LocalPorts[i], data: '+LocalPorts[i].foo);
            LocalPorts[i].postMessage(LocalPorts[i].foo);
        }
    }
}