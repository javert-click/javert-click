import {test, assert_true, done} from "../../../../../js/DOM/Events/Testharness";

var expected = ['XMLHttpRequest', 'WebSocket', 'EventSource', 'MessageChannel', 'Worker', 'SharedWorker'];
for (var i = 0; i < expected.length; ++i) {
  var property = expected[i];
  test(function() {
    console.log('Testing if property '+property+' is in self');
    assert_true(property in self);
  }, "existence of " + property);
}

done();