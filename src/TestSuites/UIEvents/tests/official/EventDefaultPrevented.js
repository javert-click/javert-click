const DOM                = initDOM();
const Event              = DOM.Event;
const CustomEvent        = DOM.CustomEvent;

const Promise            = initPromise().Promise;
var HTMLFiles            = initUIEventsFiles();
var docload              = initDocumentLoading(DOM, HTMLFiles);
var document             = docload.loadDocument("EventDefaultPreventedAfterDispatch.html");
var window               = DOM.window;
var self                 = window.clone();
var testharness          = initTestHarness(DOM, Promise, this);


var ev;
testharness.
test(function() {
  ev = document.createEvent("Event");
  testharness.assert_equals(ev.defaultPrevented, false, "defaultPrevented");
}, "When an event is created, defaultPrevented should be initialized to false.");
testharness.
test(function() {
  ev.initEvent("foo", true, false);
  testharness.assert_equals(ev.bubbles, true, "bubbles");
  testharness.assert_equals(ev.cancelable, false, "cancelable");
  testharness.assert_equals(ev.defaultPrevented, false, "defaultPrevented");
}, "initEvent should work correctly (not cancelable).");
testharness.
test(function() {
  testharness.assert_equals(ev.cancelable, false, "cancelable (before)");
  ev.preventDefault();
  testharness.assert_equals(ev.cancelable, false, "cancelable (after)");
  testharness.assert_equals(ev.defaultPrevented, false, "defaultPrevented");
}, "preventDefault() should not change defaultPrevented if cancelable is false.");
testharness.
test(function() {
  testharness.assert_equals(ev.cancelable, false, "cancelable (before)");
  ev.returnValue = false;
  testharness.assert_equals(ev.cancelable, false, "cancelable (after)");
  testharness.assert_equals(ev.defaultPrevented, false, "defaultPrevented");
}, "returnValue should not change defaultPrevented if cancelable is false.");
testharness.
test(function() {
  ev.initEvent("foo", true, true);
  testharness.assert_equals(ev.bubbles, true, "bubbles");
  testharness.assert_equals(ev.cancelable, true, "cancelable");
  testharness.assert_equals(ev.defaultPrevented, false, "defaultPrevented");
}, "initEvent should work correctly (cancelable).");
testharness.
test(function() {
  testharness.assert_equals(ev.cancelable, true, "cancelable (before)");
  ev.preventDefault();
  testharness.assert_equals(ev.cancelable, true, "cancelable (after)");
  testharness.assert_equals(ev.defaultPrevented, true, "defaultPrevented");
}, "preventDefault() should change defaultPrevented if cancelable is true.");
testharness.
test(function() {
  ev.initEvent("foo", true, true);
  testharness.assert_equals(ev.cancelable, true, "cancelable (before)");
  ev.returnValue = false;
  testharness.assert_equals(ev.cancelable, true, "cancelable (after)");
  testharness.assert_equals(ev.defaultPrevented, true, "defaultPrevented");
}, "returnValue should change defaultPrevented if cancelable is true.");
testharness.
test(function() {
  ev.initEvent("foo", true, true);
  testharness.assert_equals(ev.bubbles, true, "bubbles");
  testharness.assert_equals(ev.cancelable, true, "cancelable");
  testharness.assert_equals(ev.defaultPrevented, false, "defaultPrevented");
}, "initEvent should unset defaultPrevented.");
