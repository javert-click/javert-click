//Title: MessageEvent

import { MessageEvent } from '../../../js/DOM/Events/MessageEvent';
import { test, assert_false, assert_throws } from '../../../js/DOM/Events/Testharness';

var prefixes = ['moz', 'ms', 'o', 'webkit'];
prefixes.forEach(function(prefix) {
  var name = prefix + "InitMessageEvent";

  test(function() {
    console.log('Going to check that name in MessageEvent.prototype is false? '+(name in MessageEvent.prototype));
    assert_false(name in MessageEvent.prototype);
  }, name + " on the prototype");

  test(function() {
    var event = new MessageEvent("message");
    console.log('Going to check that name in MessageEvent is false? '+(name in event));
    assert_false(name in event);
  }, name + " on the instance");
});

test(function() {
  var event = new MessageEvent("message");
  console.log('Expecting the following to throw TypeError');
  assert_throws(new TypeError(), function() {
    event.initMessageEvent();
  }, "Not enough arguments to initMessageEvent");
  console.log('Finished test!');
}, "initMessageEvent with no arguments");