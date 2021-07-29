import { assert_equals, setup } from '../../../js/DOM/Events/Testharness';

const HTMLDocument = require('../../../js/DOM/Events/HTMLDocument');
const Window = require('../../../js/DOM/Events/Window');

setup({ single_test: true });

var window = Window.getInstance();

var document = new HTMLDocument.HTMLDocument();
var iframe = document.createElement('iframe');
document.appendChild(iframe);
iframe.src = "004-1.js";
var iframe2 = document.createElement('iframe');
document.appendChild(iframe2);
iframe2.src = "004-1.js";
iframe.onload = iframe_loaded;
iframe2.onload = iframe_loaded;

var i = 0;
var load_count = 0;

var w1 = new SharedWorker('004-2.js', 'x');
w1.port.onmessage = function(e) {
  i++;
  check_result();
};


function iframe_loaded() {
  load_count++;
  check_result();
}

function check_result() {
  //timeout to allow for extra, unexpected, messages to arrive
  if (i == 3 && load_count == 2) {
    setTimeout(function() {
      assert_equals(load_count, 2);
      assert_equals(i, 3);
      done();
    }, 500);
  }
}