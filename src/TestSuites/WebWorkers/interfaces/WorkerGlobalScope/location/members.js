//Title: members of WorkerLocation

import { async_test, assert_equals } from '../../../../../js/DOM/Events/Testharness';
const WorkerInfo = require('../../../../../js/MessagePassing/WebWorkers/Worker');
const Worker = WorkerInfo.Worker;
const location = require('../../../../../js/MessagePassing/WebMessaging/Location');

async_test(function() {
  var worker = new Worker('members-worker.js');
  worker.onmessage = this.step_func(function(e) {
    assert_equals(e.data[0], null);
    assert_equals(e.data[1], location.href.replace('.html', '.js'), 'href');
    assert_equals(e.data[2], location.protocol, 'protocol');
    assert_equals(e.data[3], location.host, 'host');
    assert_equals(e.data[4], location.hostname, 'hostname');
    assert_equals(e.data[5], location.port, 'port');
    assert_equals(e.data[6], location.pathname.replace('.html', '.js'), 'pathname');
    assert_equals(e.data[7], location.search, 'search');
    assert_equals(e.data[8], '', 'hash');
    this.done();
  });
});