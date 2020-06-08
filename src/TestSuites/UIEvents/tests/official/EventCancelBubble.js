const DOM                = initDOM();
const Event              = DOM.Event;
const CustomEvent        = DOM.CustomEvent;

const Promise            = initPromise().Promise;
var HTMLFiles            = initUIEventsFiles();
var docload              = initDocumentLoading(DOM, HTMLFiles);
var document             = docload.loadDocument("EventCancelBubble.html");
var window               = DOM.window;
var self                 = window.clone();
var testharness          = initTestHarness(DOM, Promise, this);


testharness.
test(function () {
  // See https://dom.spec.whatwg.org/#stop-propagation-flag
  var e = document.createEvent('Event');
  testharness.assert_false(e.cancelBubble, "cancelBubble must be false after event creation.");
}, "cancelBubble must be false when an event is initially created.");

testharness.
test(function () {
  // See https://dom.spec.whatwg.org/#concept-event-initialize

  // Event which bubbles.
  var one = document.createEvent('Event');
  one.cancelBubble = true;
  one.initEvent('foo', true/*bubbles*/, false/*cancelable*/);
  testharness.assert_false(one.cancelBubble, "initEvent() must set cancelBubble to false. [bubbles=true]");
  // Re-initialization.
  one.cancelBubble = true;
  one.initEvent('foo', true/*bubbles*/, false/*cancelable*/);
  testharness.assert_false(one.cancelBubble, "2nd initEvent() call must set cancelBubble to false. [bubbles=true]");

  // Event which doesn't bubble.
  var two = document.createEvent('Event');
  two.cancelBubble = true;
  two.initEvent('foo', false/*bubbles*/, false/*cancelable*/);
  testharness.assert_false(two.cancelBubble, "initEvent() must set cancelBubble to false. [bubbles=false]");
  // Re-initialization.
  two.cancelBubble = true;
  two.initEvent('foo', false/*bubbles*/, false/*cancelable*/);
  testharness.assert_false(two.cancelBubble, "2nd initEvent() call must set cancelBubble to false. [bubbles=false]");
}, "Initializing an event must set cancelBubble to false.");

testharness.
test(function () {
  // See https://dom.spec.whatwg.org/#dom-event-stoppropagation
  var e = document.createEvent('Event');
  e.stopPropagation();
  testharness.assert_true(e.cancelBubble, "stopPropagation() must set cancelBubble to true.");
}, "stopPropagation() must set cancelBubble to true.");

testharness.
test(function () {
  // See https://dom.spec.whatwg.org/#dom-event-stopimmediatepropagation
  var e = document.createEvent('Event');
  e.stopImmediatePropagation();
  testharness.assert_true(e.cancelBubble, "stopImmediatePropagation() must set cancelBubble to true.");
}, "stopImmediatePropagation() must set cancelBubble to true.");

testharness.
test(function () {
  var one = document.createEvent('Event');
  one.stopPropagation();
  one.cancelBubble = false;
  testharness.assert_true(one.cancelBubble, "cancelBubble must still be true after attempting to set it to false.");
}, "Event.cancelBubble=false must have no effect.");

testharness.
test(function (t) {
  var outer = document.getElementById('outer');
  var middle = document.getElementById('middle');
  var inner = document.getElementById('inner');

  outer.addEventListener('barbaz', t.step_func(function () {
    testharness.assert_unreached("Setting Event.cancelBubble=false after setting Event.cancelBubble=true should have no effect.");
  }), false/*useCapture*/);

  middle.addEventListener('barbaz', function (e) {
    e.cancelBubble = true;// Stop propagation.
    e.cancelBubble = false;// Should be a no-op.
  }, false/*useCapture*/);

  var barbazEvent = document.createEvent('Event');
  barbazEvent.initEvent('barbaz', true/*bubbles*/, false/*cancelable*/);
  inner.dispatchEvent(barbazEvent);
}, "Event.cancelBubble=false must have no effect during event propagation.");

testharness.
test(function () {
  // See https://dom.spec.whatwg.org/#concept-event-dispatch
  // "14. Unset event’s [...] stop propagation flag,"
  var e = document.createEvent('Event');
  e.initEvent('foobar', true/*bubbles*/, true/*cancelable*/);
  document.body.addEventListener('foobar', function listener(e) {
    e.stopPropagation();
  });
  document.body.dispatchEvent(e);
  testharness.assert_false(e.cancelBubble, "cancelBubble must be false after an event has been dispatched.");
}, "cancelBubble must be false after an event has been dispatched.");

testharness.
test(function (t) {
  var outer = document.getElementById('outer');
  var middle = document.getElementById('middle');
  var inner = document.getElementById('inner');

  var propagationStopper = function (e) {
    e.cancelBubble = true;
  };

  // Bubble phase
  middle.addEventListener('bar', propagationStopper, false/*useCapture*/);
  outer.addEventListener('bar', t.step_func(function listenerOne() {
    testharness.assert_unreached("Setting cancelBubble=true should stop the event from bubbling further.");
  }), false/*useCapture*/);

  var barEvent = document.createEvent('Event');
  barEvent.initEvent('bar', true/*bubbles*/, false/*cancelable*/);
  inner.dispatchEvent(barEvent);

  // Capture phase
  outer.addEventListener('qux', propagationStopper, true/*useCapture*/);
  middle.addEventListener('qux', t.step_func(function listenerTwo() {
    testharness.assert_unreached("Setting cancelBubble=true should stop the event from propagating further, including during the Capture Phase.");
  }), true/*useCapture*/);

  var quxEvent = document.createEvent('Event');
  quxEvent.initEvent('qux', false/*bubbles*/, false/*cancelable*/);
  inner.dispatchEvent(quxEvent);
}, "Event.cancelBubble=true must set the stop propagation flag.");
  
