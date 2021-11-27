//Title: messagechannel in shared worker

import { assert_equals, async_test, setup } from '../../../../js/DOM/Events/Testharness';

const HTMLDocument = require('../../../../js/DOM/Events/HTMLDocument');
const Window = require('../../../../js/DOM/Events/Window');
const SharedWorkerInfo = require('../../../../js/MessagePassing/WebWorkers/SharedWorker');
const SharedWorker = SharedWorkerInfo.SharedWorker;

setup({ single_test: true });

var window = Window.getInstance();

var document = new HTMLDocument.HTMLDocument();
console.log('MAIN: going to create IFrame');
var iframe = document.createElement('iframe');
document.appendChild(iframe);
iframe.src = "008-1-multiple.js";
console.log('MAIN: IFrame created');


var t = async_test();
window.onload = t.step_func(function() {
  console.log('MAIN: going to create SharedWorker');
  var w1 = new SharedWorker('008-multiple-worker.js');
  console.log('MAIN: SharedWorker created');
  w1.port.onmessage = this.step_func(function(e) {
    console.log('MAIN: received message '+e.data);
    e.ports[0].onmessage = this.step_func(function(e) {
      console.log('Going to call assert, e.data: '+e.data);
      assert_equals(e.data, 2);
      this.done();
    });
  });
  w1.onerror = this.unreached_func("error");
});