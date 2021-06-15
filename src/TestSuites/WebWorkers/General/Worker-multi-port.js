//Title: Test sending multiple ports through Worker.postMessage

import { MessageChannel } from '../../../js/MessagePassing/PostMessage/MessageChannel';
import { Worker } from '../../../js/MessagePassing/WebWorkers/Worker';
import { test, async_test, assert_true, assert_throws_js, assert_throws_dom } from '../../../js/DOM/Events/Testharness';

async_test(function(t) {
 var worker = new Worker("Worker-thread-multi-port.js");
 worker.onmessage = t.step_func_done(function(evt) {
    console.log('MAIN: 1st test, 1st assert. Data should start with PASS. Got data: '+evt.data);
    assert_true(evt.data.startsWith('PASS'));
 });
 worker.postMessage("noport");
}, 'Test postMessage with no port.');


async_test(function(t) {
 var worker = new Worker("Worker-thread-multi-port.js");
 worker.onmessage = t.step_func_done(function(evt) {
    console.log('MAIN: 2nd test, 1st assert. Data should start with PASS. Got data: '+evt.data);
    assert_true(evt.data.startsWith('PASS'));
 });
 worker.postMessage("noargs");
}, 'Test postMessage with no arguments.');

async_test(function(t) {
 var worker = new Worker("Worker-thread-multi-port.js");
 worker.onmessage = t.step_func_done(function(evt) {
    console.log('MAIN: 3rd test, 1st assert. Data should start with PASS. Got data: '+evt.data);
    assert_true(evt.data.startsWith('PASS'));
 });
 worker.postMessage("zero ports", []);
}, 'Test postMessage with no ports and empty array.');

async_test(function(t) {
 var worker = new Worker("Worker-thread-multi-port.js");
 var channel = new MessageChannel();
 worker.onmessage = t.step_func_done(function(evt) {
    console.log('MAIN: 4th test, 1st assert. Data should start with PASS. Got data: '+evt.data);
    assert_true(evt.data.startsWith('PASS'));
 });
 worker.postMessage("two ports", [channel.port1, channel.port2]);
}, 'Test postMessage with two ports.');

test(() => {
 var worker = new Worker("Worker-thread-multi-port.js");
 assert_throws_js(TypeError,
                    function() { worker.postMessage(); },
                    'Empty postMessage should throw exception.');
 console.log('5th TEST PASSED');
}, 'Test empty postMessage throws exception.');

test(() => {
 var worker = new Worker("Worker-thread-multi-port.js");
 var channel = new MessageChannel();
 assert_throws_js(TypeError,
                    function() { worker.postMessage("null port",
                                                    [channel.port1, null,
                                                    channel.port2]); },
                    'postMessage with null ports should throw exception.');
 console.log('6th TEST PASSED');
}, 'Test postMessage with null ports throws exception.');

test(() => {
 var worker = new Worker("Worker-thread-multi-port.js")
 var channel = new MessageChannel();
 assert_throws_dom('DataCloneError',
                    function() { worker.postMessage("notAPort",
                                                    [channel.port1, {},
                                                    channel.port2]); },
                    'postMessage with incorrect ports should throw exception.');
 console.log('7th TEST PASSED');
}, 'Test postMessage with incorrect ports throws exception');

test(() => {
 var worker = new Worker("Worker-thread-multi-port.js");
 assert_throws_dom('DataCloneError',
                    function() { worker.postMessage("notASequence", [{length: 3}]) },
                    'postMessage without sequence should throw exception.');
 console.log('8th TEST PASSED');
}, 'Test postMessage without sequence throws exception');

async_test(function(t) {
 var worker = new Worker("Worker-thread-multi-port.js");
 var channel = new MessageChannel();
 assert_throws_dom('DataCloneError',
                    function() { worker.postMessage("notAPort",
                                                    [channel.port1, {},
                                                    channel.port2]); },
                    'postMessage with incorrect ports should throw exception.');
 console.log('9th TEST, 1st ASSERT OK');
 worker.onmessage = t.step_func_done(function(evt) {
    console.log('9th TEST, Data should start with PASS: '+evt.data);
    assert_true(evt.data.startsWith('PASS'));
    console.log('9th TEST, 2nd ASSERT OK');
 });
 worker.postMessage("failed ports", [channel.port1, channel.port2]);
}, 'Test postMessage on channel with previous failed postMessage calls.');