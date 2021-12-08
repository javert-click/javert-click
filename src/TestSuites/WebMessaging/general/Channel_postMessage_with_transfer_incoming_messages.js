import { MessageChannel } from '../../../js/MessagePassing/WebMessaging/MessageChannel';
import { async_test, assert_equals } from '../../../js/DOM/Events/Testharness';

async_test(function(t) {
    var channel1 = new MessageChannel();
    var channel2 = new MessageChannel();
    var channel3 = new MessageChannel();
    channel2.port2.onmessage = t.step_func(function (evt) {
      console.log('Executing channel2.port2 handler');
      channel3.port1.onmessage = t.step_func(function (evt) {
        console.log('Executing channel3.port2 handler');
        var counter = 0;
        evt.ports[0].onmessage = t.step_func(function (evt) {
          console.log('Executing evt.ports[0] (channel1.port1) handler');
          if (counter == 0) {
            console.log('1st assert: evt.data === "First"? '+(evt.data === "First"));
            assert_equals(evt.data, "First");
            counter = 1;
          } else if (counter == 1) {
            console.log('2nd assert: evt.data === "Second"? '+(evt.data === "Second"));
            assert_equals(evt.data, "Second");
            counter = 2;
          } else if (counter == 2) {
            console.log('3rd assert: evt.data === "Third"? '+(evt.data === "Third"));
            assert_equals(evt.data, "Third");
            counter = 3;
          } else if (counter == 3) {
            console.log('4th assert: evt.data === "Fourth"? '+(evt.data === "Fourth"));
            assert_equals(evt.data, "Fourth");
            t.done();
          }
        });
        channel1.port2.postMessage("Fourth");
      });
      channel1.port2.postMessage("Second");
      channel1.port2.postMessage("Third");
      channel3.port2.postMessage("2", evt.ports);
    });
    channel1.port2.postMessage("First");
    channel2.port1.postMessage("1", [channel1.port1]);
  }, `When transferring a non-enabled port mutiple times,
      incoming messages sent at various transfer steps are received in order upon enablement.`);