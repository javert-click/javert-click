import { assert_equals, setup, done } from '../../../../js/DOM/Events/Testharness';

const HTMLDocument = require('../../../../js/DOM/Events/HTMLDocument');
const Window = require('../../../../js/DOM/Events/Window');
const SharedWorkerInfo = require('../../../../js/MessagePassing/WebWorkers/SharedWorker');
const SharedWorker = SharedWorkerInfo.SharedWorker;

setup({ single_test: true });

var window = Window.getInstance();

var document = new HTMLDocument.HTMLDocument();

var i = 0;
var load_count = 0;

var w1 = new SharedWorker('004-2.js', 'x');
console.log('MAIN: 1st shared worker created');
w1.port.onmessage = function(e) {
  console.log('Main: received message from worker');
  i++;
  check_result();
};


function iframe_loaded() {
  console.log('running iframe_loaded');
  load_count++;
  check_result();
}

function check_result() {
  //timeout to allow for extra, unexpected, messages to arrive
  console.log('MAIN: running check_result, i: '+i+', load_count: '+load_count);
  if (i == 3 && load_count == 2) {
    setTimeout(function() {
      assert_equals(load_count, 2);
      assert_equals(i, 3);
      done();
    }, 500);
  }
}

var iframe = document.createElement('iframe');
document.appendChild(iframe);
var iframe2 = document.createElement('iframe');
iframe.appendChild(iframe2);
iframe.onload = iframe_loaded;
iframe2.onload = iframe_loaded;
iframe.src = "004-1.js";
iframe2.src = "004-1.js";