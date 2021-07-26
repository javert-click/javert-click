//Title: 'message' event properties

import { async_test, assert_class_string, assert_equals, assert_false, assert_array_equals } from '../../../../js/DOM/Events/Testharness';
const WorkerInfo = require('../../../../js/MessagePassing/WebWorkers/Worker');
const Worker = WorkerInfo.Worker;

async_test("Properties of the 'message' event").step(function() {
    var worker = new Worker("message-event-worker.js");
    worker.onmessage = this.step_func_done(function (evt) {
    assert_class_string(evt, "MessageEvent");
    assert_equals(evt.type, "message");
    assert_false(evt.bubbles, "bubbles should be false");
    assert_false(evt.cancelable, "cancelable should be false");
    assert_equals(evt.data, "test");
    assert_equals(evt.origin, "", "origin");
    assert_equals(evt.lastEventId, "", "lastEventId");
    assert_equals(evt.source, null, "source");
    assert_array_equals(evt.ports, [], "ports");
  });
});