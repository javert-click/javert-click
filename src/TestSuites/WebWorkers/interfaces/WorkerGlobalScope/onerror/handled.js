import { async_test, assert_equals, assert_unreached } from '../../../../../js/DOM/Events/Testharness';
const WorkerInfo = require('../../../../../js/MessagePassing/WebWorkers/Worker');
const Worker = WorkerInfo.Worker;

var document = { URL: "handled-worker.html"};

async_test(function() {
  var worker = new Worker('handled-worker.js');
  worker.onmessage = this.step_func(function(e) {
    assert_equals(typeof e.data[0], 'string', 'first argument');
    //assert_equals(e.data[1], document.URL.replace('.html', '.js'), 'second argument');
    assert_equals(typeof e.data[2], 'number', 'third argument');
    assert_equals(typeof e.data[3], 'number', 'fourth argument');
    setTimeout(this.step_func(function() {
    this.done();
    }), 100);
  });
  worker.onerror = this.step_func(function(e) {
    assert_unreached();
  });
});