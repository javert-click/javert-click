const DOM                = initDOM();
const Event              = DOM.Event;
const CustomEvent        = DOM.CustomEvent;
const Document           = DOM.Document;
const Text               = DOM.Text;
const MouseEvent         = DOM.MouseEvent;
const KeyboardEvent      = DOM.KeyboardEvent;
const UIEvent            = DOM.UIEvent;
const Performance        = DOM.Performance;
const ArrayUtils         = DOM.ArrayUtils;

const Promise            = initPromise().Promise;
var HTMLFiles            = initUIEventsFiles();
var docload              = initDocumentLoading(DOM, HTMLFiles);
var document             = docload.loadDocument("EventReturnValue.html");
var window               = DOM.window;
var self                 = window.clone();
var testharness          = initTestHarness(DOM, Promise, this);
var performance          = new Performance.Performance();
window.document 		 = document;
document.browsingContext = window;


testharness.
test(function() {
  var ev = new Event.Event("foo");
  testharness.assert_true(ev.returnValue, "returnValue");
}, "When an event is created, returnValue should be initialized to true.");
testharness.
test(function() {
  var ev = new Event.Event("foo", {"cancelable": false});
  testharness.assert_false(ev.cancelable, "cancelable (before)");
  ev.preventDefault();
  testharness.assert_false(ev.cancelable, "cancelable (after)");
  testharness.assert_true(ev.returnValue, "returnValue");
}, "preventDefault() should not change returnValue if cancelable is false.");
testharness.
test(function() {
  var ev = new Event.Event("foo", {"cancelable": false});
  testharness.assert_false(ev.cancelable, "cancelable (before)");
  ev.returnValue = false;
  testharness.assert_false(ev.cancelable, "cancelable (after)");
  testharness.assert_true(ev.returnValue, "returnValue");
}, "returnValue=false should have no effect if cancelable is false.");
testharness.
test(function() {
  var ev = new Event.Event("foo", {"cancelable": true});
  testharness.assert_true(ev.cancelable, "cancelable (before)");
  ev.preventDefault();
  testharness.assert_true(ev.cancelable, "cancelable (after)");
  testharness.assert_false(ev.returnValue, "returnValue");
}, "preventDefault() should change returnValue if cancelable is true.");
testharness.
test(function() {
  var ev = new Event.Event("foo", {"cancelable": true});
  testharness.assert_true(ev.cancelable, "cancelable (before)");
  ev.returnValue = false;
  testharness.assert_true(ev.cancelable, "cancelable (after)");
  testharness.assert_false(ev.returnValue, "returnValue");
}, "returnValue should change returnValue if cancelable is true.");
testharness.
test(function() {
  var ev = document.createEvent("Event");
  ev.returnValue = false;
  ev.initEvent("foo", true, true);
  testharness.assert_true(ev.bubbles, "bubbles");
  testharness.assert_true(ev.cancelable, "cancelable");
  testharness.assert_true(ev.returnValue, "returnValue");
}, "initEvent should unset returnValue.");
testharness.
test(function() {
  var ev = new Event.Event("foo", {"cancelable": true});
  ev.preventDefault();
  ev.returnValue = true;// no-op
  testharness.assert_true(ev.defaultPrevented);
  testharness.assert_false(ev.returnValue);
}, "returnValue=true should have no effect once the canceled flag was set.");
  