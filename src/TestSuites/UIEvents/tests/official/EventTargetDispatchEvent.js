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
var document             = docload.loadDocument("EventTargetDispatchEvent.html");
var window               = DOM.window;
var self                 = window.clone();
var testharness          = initTestHarness(DOM, Promise, this);
var performance          = new Performance.Performance();
window.document 		 = document;
document.browsingContext = window;


testharness.setup({
  "allow_uncaught_exception": true,
})

testharness.
test(function() {
  testharness.assert_throws(new TypeError(), function() { document.dispatchEvent(null) })
}, "Calling dispatchEvent(null).")

var aliases = {
  "BeforeUnloadEvent": "BeforeUnloadEvent",
  "CompositionEvent": "CompositionEvent",
  "CustomEvent": "CustomEvent",
  "DeviceMotionEvent": "DeviceMotionEvent",
  "DeviceOrientationEvent": "DeviceOrientationEvent",
  "DragEvent": "DragEvent",
  "Event": "Event",
  "Events": "Event",
  "FocusEvent": "FocusEvent",
  "HashChangeEvent": "HashChangeEvent",
  "HTMLEvents": "Event",
  "KeyboardEvent": "KeyboardEvent",
  "MessageEvent": "MessageEvent",
  "MouseEvent": "MouseEvent",
  "MouseEvents": "MouseEvent",
  "StorageEvent": "StorageEvent",
  "SVGEvents": "Event",
  "TextEvent": "CompositionEvent",
  "TouchEvent": "TouchEvent",
  "UIEvent": "UIEvent",
  "UIEvents": "UIEvent",
};

for (var alias in aliases) {
 
testharness. test(function() {
    var e = document.createEvent(alias)
    testharness.assert_equals(e.type, "", "Event type should be empty string before initialization")
    testharness.assert_throws("InvalidStateError", function() { document.dispatchEvent(e) })
  }, "If the event's initialized flag is not set, an InvalidStateError must be thrown (" + alias + ").")
}

var dispatch_dispatch = 
testharness.async_test("If the event's dispatch flag is set, an InvalidStateError must be thrown.")
dispatch_dispatch.step(function() {
  var e = document.createEvent("Event")
  e.initEvent("type", false, false)

  var target = document.createElement("div")
  target.addEventListener("type", dispatch_dispatch.step_func(function() {
    testharness.assert_throws("InvalidStateError", function() {
      target.dispatchEvent(e)
    })
    testharness.assert_throws("InvalidStateError", function() {
      document.dispatchEvent(e)
    })
  }), false)

  testharness.assert_equals(target.dispatchEvent(e), true, "dispatchEvent must return true")

  dispatch_dispatch.done()
})

testharness.
test(function() {
  // https://www.w3.org/Bugs/Public/show_bug.cgi?id=17713
  // https://www.w3.org/Bugs/Public/show_bug.cgi?id=17714

  var e = document.createEvent("Event")
  e.initEvent("type", false, false)

  var called = []

  var target = document.createElement("div")
  target.addEventListener("type", function() {
    called.push("First")
    throw new Error()
  }, false)

  target.addEventListener("type", function() {
    called.push("Second")
  }, false)

  testharness.assert_equals(target.dispatchEvent(e), true, "dispatchEvent must return true")
  testharness.assert_array_equals(called, ["First", "Second"],
                      "Should have continued to call other event listeners")
}, "Exceptions from event listeners must not be propagated.")


testharness.async_test(function() {
  var results = []
  var outerb = document.createElement("b")
  var middleb = outerb.appendChild(document.createElement("b"))
  var innerb = middleb.appendChild(document.createElement("b"))
  outerb.addEventListener("x", this.step_func(function() {
    middleb.addEventListener("x", this.step_func(function() {
      results.push("middle")
    }), true)
    results.push("outer")
  }), true)
  innerb.dispatchEvent(new Event.Event("x"))
  testharness.assert_array_equals(results, ["outer", "middle"])
  this.done()
}, "Event listeners added during dispatch should be called");


testharness.async_test(function() {
  var results = []
  var b = document.createElement("b")
  b.addEventListener("x", this.step_func(function() {
    results.push(1)
  }), true)
  b.addEventListener("x", this.step_func(function() {
    results.push(2)
  }), false)
  b.addEventListener("x", this.step_func(function() {
    results.push(3)
  }), true)
  b.dispatchEvent(new Event.Event("x"))
  testharness.assert_array_equals(results, [1, 3, 2])
  this.done()
}, "Capturing event listeners should be called before non-capturing ones")
