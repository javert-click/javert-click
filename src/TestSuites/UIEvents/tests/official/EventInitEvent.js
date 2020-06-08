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
var document             = docload.loadDocument("EventInitEvent.html");
var window               = DOM.window;
var self                 = window.clone();
var testharness          = initTestHarness(DOM, Promise, this);
var performance          = new Performance.Performance();
window.document 		 = document;
document.browsingContext = window;


var booleans = [true, false];
booleans.forEach(function(bubbles) {
  booleans.forEach(function(cancelable) {
   
testharness. test(function() {
      var e = document.createEvent("Event")
      e.initEvent("type", bubbles, cancelable)

      // Step 2.
      // Stop (immediate) propagation flag is tested later
      testharness.assert_equals(e.defaultPrevented, false, "defaultPrevented")
      testharness.assert_equals(e.returnValue, true, "returnValue")
      // Step 3.
      testharness.assert_equals(e.isTrusted, false, "isTrusted")
      // Step 4.
      testharness.assert_equals(e.target, null, "target")
      testharness.assert_equals(e.srcElement, null, "srcElement")
      // Step 5.
      testharness.assert_equals(e.type, "type", "type")
      // Step 6.
      testharness.assert_equals(e.bubbles, bubbles, "bubbles")
      // Step 7.
      testharness.assert_equals(e.cancelable, cancelable, "cancelable")
    }, "Properties of initEvent(type, " + bubbles + ", " + cancelable + ")")
  })
})

testharness.
test(function() {
  var e = document.createEvent("Event")
  e.initEvent("type 1", true, false)
  testharness.assert_equals(e.type, "type 1", "type (first init)")
  testharness.assert_equals(e.bubbles, true, "bubbles (first init)")
  testharness.assert_equals(e.cancelable, false, "cancelable (first init)")

  e.initEvent("type 2", false, true)
  testharness.assert_equals(e.type, "type 2", "type (second init)")
  testharness.assert_equals(e.bubbles, false, "bubbles (second init)")
  testharness.assert_equals(e.cancelable, true, "cancelable (second init)")
}, "Calling initEvent multiple times (getting type).")

testharness.
test(function() {
  // https://bugzilla.mozilla.org/show_bug.cgi?id=998809
  var e = document.createEvent("Event")
  e.initEvent("type 1", true, false)
  testharness.assert_equals(e.bubbles, true, "bubbles (first init)")
  testharness.assert_equals(e.cancelable, false, "cancelable (first init)")

  e.initEvent("type 2", false, true)
  testharness.assert_equals(e.type, "type 2", "type (second init)")
  testharness.assert_equals(e.bubbles, false, "bubbles (second init)")
  testharness.assert_equals(e.cancelable, true, "cancelable (second init)")
}, "Calling initEvent multiple times (not getting type).")

// Step 2.

testharness.async_test(function() {
  // https://www.w3.org/Bugs/Public/show_bug.cgi?id=17715

  var e = document.createEvent("Event")
  e.initEvent("type", false, false)
  testharness.assert_equals(e.type, "type", "type (first init)")
  testharness.assert_equals(e.bubbles, false, "bubbles (first init)")
  testharness.assert_equals(e.cancelable, false, "cancelable (first init)")

  var target = document.createElement("div")
  target.addEventListener("type", this.step_func(function() {
    e.initEvent("fail", true, true)
    testharness.assert_equals(e.type, "type", "type (second init)")
    testharness.assert_equals(e.bubbles, false, "bubbles (second init)")
    testharness.assert_equals(e.cancelable, false, "cancelable (second init)")
  }), false)

  testharness.assert_equals(target.dispatchEvent(e), true, "dispatchEvent must return true")

  this.done()
}, "Calling initEvent must not have an effect during dispatching.")

testharness.
test(function() {
  var e = document.createEvent("Event")
  e.stopPropagation()
  e.initEvent("type", false, false)
  var target = document.createElement("div")
  var called = false
  target.addEventListener("type", function() { called = true }, false)
  testharness.assert_false(e.cancelBubble, "cancelBubble must be false")
  testharness.assert_true(target.dispatchEvent(e), "dispatchEvent must return true")
  testharness.assert_true(called, "Listener must be called")
}, "Calling initEvent must unset the stop propagation flag.")

testharness.
test(function() {
  var e = document.createEvent("Event")
  e.stopImmediatePropagation()
  e.initEvent("type", false, false)
  var target = document.createElement("div")
  var called = false
  target.addEventListener("type", function() { called = true }, false)
  testharness.assert_true(target.dispatchEvent(e), "dispatchEvent must return true")
  testharness.assert_true(called, "Listener must be called")
}, "Calling initEvent must unset the stop immediate propagation flag.")


testharness.async_test(function() {
  var e = document.createEvent("Event")
  e.initEvent("type", false, false)

  var target = document.createElement("div")
  target.addEventListener("type", this.step_func(function() {
    e.initEvent("type2", true, true);
    testharness.assert_equals(e.type, "type", "initEvent type setter should short-circuit");
    testharness.assert_false(e.bubbles, "initEvent bubbles setter should short-circuit");
    testharness.assert_false(e.cancelable, "initEvent cancelable setter should short-circuit");
  }), false)
  testharness.assert_equals(target.dispatchEvent(e), true, "dispatchEvent must return true")

  this.done()
}, "Calling initEvent during propagation.")

testharness.
test(function() {
  var e = document.createEvent("Event")
  testharness.assert_throws(new TypeError(), function() {
    e.initEvent()
  })
}, "First parameter to initEvent should be mandatory.")

testharness.
test(function() {
  var e = document.createEvent("Event")
  e.initEvent("type")
  testharness.assert_equals(e.type, "type", "type")
  testharness.assert_false(e.bubbles, "bubbles")
  testharness.assert_false(e.cancelable, "cancelable")
}, "Tests initEvent's default parameter values.")
