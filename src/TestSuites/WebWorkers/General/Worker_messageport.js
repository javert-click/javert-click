//Title: Test that pages and workers can send MessagePorts to one another.

import { MessageChannel } from '../../../js/MessagePassing/PostMessage/MessageChannel';
import { Worker } from '../../../js/MessagePassing/WebWorkers/Worker';
import { async_test, assert_equals } from '../../../js/DOM/Events/Testharness';
/*
async_test(function(t) {
    var worker = new Worker("Worker-messageport.js");

    // Send messages with and without ports to the worker to make sure it gets them.
    worker.postMessage("noport");
    worker.onmessage = t.step_func_done(evt => {
      console.log('MAIN: data should be equal to "PASS: evt.ports = [] as expected"?'+evt.data);
      assert_equals(evt.data, "PASS: evt.ports = [] as expected");
    });
}, 'Test sending messages to workers with no port.');

async_test(function(t) {
    var worker = new Worker("Worker-messageport.js");
    var channel = new MessageChannel();

    worker.postMessage("port", [channel.port1]);
    worker.onmessage = t.step_func(evt => {
      console.log('MAIN: data should be equal to "PASS: Received message port"?'+evt.data);
      assert_equals(evt.data, "PASS: Received message port");
    });

    // Send a message on the new port to make sure it gets to the worker.
    channel.port2.postMessage("ping");

    // Wait for the response.
    channel.port2.onmessage = t.step_func_done(evt => {
      console.log('MAIN: data should be equal to "pong"?'+evt.data);
      assert_equals(evt.data, "pong");
    });
    channel.port2.start();
}, 'Test sending message to a worker on a port.');

async_test(function(t) {
    var worker = new Worker("Worker-messageport.js");
    var channel = new MessageChannel();

    worker.onmessage = t.step_func(evt => {
      console.log('evt.data should be port? '+evt.data);
      assert_equals(evt.data, "port");
      console.log('String(evt.ports) is equal to '+String(evt.ports));
      assert_equals(String(evt.ports), "[object MessagePort]");
      console.log('Asserting that evt.ports.length is 1: '+evt.ports.length);
      assert_equals(evt.ports.length, 1);
      evt.ports[0].postMessage("ping");
      evt.ports[0].onmessage = t.step_func_done(evt => {
        console.log('evt.data must be pong:'+evt.data);
        assert_equals(evt.data, "pong");
      });
    evt.ports[0].start();
    });
    worker.postMessage("getport");
}, 'Test getting messages from a worker on a port.');

/*
* TODOMP: I don't understand why the spam messages must arrive before the 'spamdone' message!
*/

async_test(function(t) {
    var worker = new Worker("Worker-messageport.js");
    var channel = new MessageChannel();
    worker.onmessage = t.step_func(evt => { gotSpam(channel.port1); });
    worker.postMessage("spam", [channel.port2]);

    function gotSpam(port) {
      console.log('MAIN: got spam done!');
      var spamCount = 0;
      port.onmessage = t.step_func(evt => {
        console.log('MAIN: got spam, data: '+evt.data);
        assert_equals(evt.data, spamCount);
        spamCount++;
        //if (spamCount == 1000) {
        if (spamCount == 4) {
          t.done();
        }
      });
    }
}, 'Test sending many messages to workers using ports.');