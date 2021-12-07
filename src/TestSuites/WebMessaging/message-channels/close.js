import { MessageChannel } from '../../../js/MessagePassing/PostMessage/MessageChannel';
import { test, async_test, assert_true, assert_equals, assert_throws_dom } from '../../../js/DOM/Events/Testharness';
const Window = require('../../../js/DOM/Events/Window');
var self = Window.getInstance();

// How long (in ms) these tests should wait before deciding no further messages
// will be received.
const time_to_wait_for_messages = 100;


async_test(t => {
    const c = new MessageChannel();
    c.port1.onmessage = t.unreached_func('Should not have delivered message');
    c.port1.close();
    c.port2.postMessage('TEST');
    setTimeout(t.step_func_done(), time_to_wait_for_messages);
  }, 'Message sent to closed port should not arrive.');

async_test(t => {
    const c = new MessageChannel();
    c.port1.onmessage = t.unreached_func('Should not have delivered message');
    c.port2.close();
    c.port2.postMessage('TEST');
    setTimeout(t.step_func_done(), time_to_wait_for_messages);
  }, 'Message sent from closed port should not arrive.');

async_test(t => {
    const c = new MessageChannel();
    c.port1.onmessage = t.unreached_func('Should not have delivered message');
    c.port1.close();
    const c2 = new MessageChannel();
    c2.port1.onmessage = t.step_func(e => {
        console.log('Message received by c2.port1: '+e.data+', number of ports transferred: '+e.ports.length);
        e.ports[0].postMessage('TESTMSG');
        setTimeout(t.step_func_done(), time_to_wait_for_messages);
      });
    c2.port2.postMessage('TEST', [c.port2]);
  }, 'Message sent to closed port from transferred port should not arrive.');
  
async_test(t => {
    const c = new MessageChannel();
    let isClosed = false;
    c.port1.onmessage = t.step_func_done(e => {
        console.log('Received msg, data: '+e.data+', isClosed: '+isClosed);
        assert_true(isClosed);
        assert_equals(e.data, 'TEST');
      });
    c.port2.postMessage('TEST');
    c.port2.close();
    isClosed = true;
  }, 'Inflight messages should be delivered even when sending port is closed afterwards.');

async_test(t => {
    const c = new MessageChannel();
    c.port1.onmessage = t.step_func_done(
      e => {
        console.log('Received message '+e.data);
        if (e.data == 'DONE'){
          console.log('e.data == DONE: '+(e.data === "DONE"));
          t.done();
          return;
        } 
        assert_equals(e.data, 'TEST');
        c.port1.close();
      });
    c.port2.postMessage('TEST');
    c.port2.postMessage('DONE');
  }, 'Close in onmessage should not cancel inflight messages.');

//TODOMP: This test works but window.postMessage is not properly implemented yet!
test(() => {
    const c = new MessageChannel();
    c.port1.close();
    assert_throws_dom("DataCloneError", () => self.postMessage(null, "*", [c.port1]));
    self.postMessage(null, "*", [c.port2]);
    console.log('Test done!');
}, "close() detaches a MessagePort (but not the one its entangled with)");
