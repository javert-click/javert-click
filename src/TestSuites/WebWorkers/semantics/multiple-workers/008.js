//Title: messagechannel in shared worker

const HTMLDocument = require('../../../js/DOM/Events/HTMLDocument');
const Window = require('../../../js/DOM/Events/Window');

setup({ single_test: true });

var window = Window.getInstance();

var document = new HTMLDocument.HTMLDocument();
var iframe = document.createElement('iframe');
document.appendChild(iframe);
iframe.src = "008-1.js";


var t = async_test();
window.onload = t.step_func(function() {
  var w1 = new SharedWorker('008-worker.js');
  w1.port.onmessage = this.step_func(function(e) {
    e.ports[0].onmessage = this.step_func(function(e) {
      assert_equals(e.data, 2);
      this.done();
    });
  });
  w1.onerror = this.unreached_func("error");
});