
//cross-document channel</title>

import { MessageChannel } from '../../../js/MessagePassing/PostMessage/MessageChannel';
import { async_test, assert_equals } from '../../../js/DOM/Events/Testharness';
const Window = require('../../../js/DOM/Events/Window');
var window = Window.getInstance();
const IFrame = require('../../../js/DOM/Events/IFrame');

var iframe1 = new IFrame.IFrame('004-1.js', window);
var iframe2 = new IFrame.IFrame('004-2.js', window);

console.log('MAIN: created two iframes');

//TODO: window.onload!

async_test(
  function(t) {
    console.log('executing tstepfun handler');
    var channel = new MessageChannel();
    console.log('Do I have iframes? '+window['0']);
    window[0].postMessage(1, '*', [channel.port1]);
    window[1].postMessage(2, '*', [channel.port2]);
    channel = null;
    window.onmessage = t.step_func(
      function(e) {
        console.log('MAIN: Got data:'+e.data);
        assert_equals(e.data, 1);
        t.done();
      });
  }
);
