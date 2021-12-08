import { async_test, assert_equals } from '../../../js/DOM/Events/Testharness';
const WorkerInfo = require('../../../js/MessagePassing/WebWorkers/Worker');
const Worker = WorkerInfo.Worker;
const Window = require('../../../js/DOM/Events/Window');
const window = Window.getInstance();
const location = require('../../../js/MessagePassing/WebMessaging/Location');


async_test(function(t) {
    var worker = new Worker('./support/WorkerLocation.js');
    worker.onmessage = t.step_func_done(function(e) {
      window.location = location;
      //debugger;
      console.log('href? '+window.location.href);
      var href = window.location.href;
      var ExpectedResult = href.substring(0, href.lastIndexOf('/')) + '/support/WorkerLocation.js';
      assert_equals(e.data.location, ExpectedResult);
    });
});