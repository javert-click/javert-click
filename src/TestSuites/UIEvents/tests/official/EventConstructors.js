const DOM                = initDOM();
const Event              = DOM.Event;
const CustomEvent        = DOM.CustomEvent;

const Promise            = initPromise().Promise;
var HTMLFiles            = initUIEventsFiles();
var docload              = initDocumentLoading(DOM, HTMLFiles);
var document             = docload.loadDocument("EventConstructors.html");
var window               = DOM.window;
var self                 = window.clone();
var testharness          = initTestHarness(DOM, Promise, this);


testharness.
test(function() {
  testharness.assert_throws(new TypeError(), function() {
    new Event.Event()
  })
})
testharness.
test(function() {
  var test_error = { name: "test" }
  testharness.assert_throws(test_error, function() {
    new Event.Event({ toString: function() { throw test_error; } })
  })
})
testharness.
test(function() {
  var ev = new Event.Event("")
  testharness.assert_equals(ev.type, "")
  testharness.assert_equals(ev.target, null)
  testharness.assert_equals(ev.srcElement, null)
  testharness.assert_equals(ev.currentTarget, null)
  testharness.assert_equals(ev.eventPhase, Event.NONE)
  testharness.assert_equals(ev.bubbles, false)
  testharness.assert_equals(ev.cancelable, false)
  testharness.assert_equals(ev.defaultPrevented, false)
  testharness.assert_equals(ev.returnValue, true)
  testharness.assert_equals(ev.isTrusted, false)
  testharness.assert_true(ev.timeStamp > 0)
  testharness.assert_true("initEvent" in ev)
})
testharness.
test(function() {
  var ev = new Event.Event("test")
  testharness.assert_equals(ev.type, "test")
  testharness.assert_equals(ev.target, null)
  testharness.assert_equals(ev.srcElement, null)
  testharness.assert_equals(ev.currentTarget, null)
  testharness.assert_equals(ev.eventPhase, Event.NONE)
  testharness.assert_equals(ev.bubbles, false)
  testharness.assert_equals(ev.cancelable, false)
  testharness.assert_equals(ev.defaultPrevented, false)
  testharness.assert_equals(ev.returnValue, true)
  testharness.assert_equals(ev.isTrusted, false)
  testharness.assert_true(ev.timeStamp > 0)
  testharness.assert_true("initEvent" in ev)
})
testharness.
test(function() {
  testharness.assert_throws(new TypeError(), function() { Event("test") },
                'Calling Event constructor without "new" must throw');
})
testharness.
test(function() {
  var ev = new Event.Event("I am an event", { bubbles: true, cancelable: false})
  testharness.assert_equals(ev.type, "I am an event")
  testharness.assert_equals(ev.bubbles, true)
  testharness.assert_equals(ev.cancelable, false)
})
testharness.
test(function() {
  var ev = new Event.Event("@", { bubblesIGNORED: true, cancelable: true})
  testharness.assert_equals(ev.type, "@")
  testharness.assert_equals(ev.bubbles, false)
  testharness.assert_equals(ev.cancelable, true)
})
testharness.
test(function() {
  var ev = new Event.Event("@", { "bubbles\0IGNORED": true, cancelable: true})
  testharness.assert_equals(ev.type, "@")
  testharness.assert_equals(ev.bubbles, false)
  testharness.assert_equals(ev.cancelable, true)
})
testharness.
test(function() {
  var ev = new Event.Event("Xx", { cancelable: true})
  testharness.assert_equals(ev.type, "Xx")
  testharness.assert_equals(ev.bubbles, false)
  testharness.assert_equals(ev.cancelable, true)
})
testharness.
test(function() {
  var ev = new Event.Event("Xx", {})
  testharness.assert_equals(ev.type, "Xx")
  testharness.assert_equals(ev.bubbles, false)
  testharness.assert_equals(ev.cancelable, false)
})
testharness.
test(function() {
  var ev = new Event.Event("Xx", {bubbles: true, cancelable: false, sweet: "x"})
  testharness.assert_equals(ev.type, "Xx")
  testharness.assert_equals(ev.bubbles, true)
  testharness.assert_equals(ev.cancelable, false)
  testharness.assert_equals(ev.sweet, undefined)
})
testharness.
test(function() {
  var called = []
  var ev = new Event.Event("Xx", {
    get cancelable() {
      called.push("cancelable")
      return false
    },
    get bubbles() {
      called.push("bubbles")
      return true;
    },
    get sweet() {
      called.push("sweet")
      return "x"
    }
  })
  testharness.assert_array_equals(called, ["bubbles", "cancelable"])
  testharness.assert_equals(ev.type, "Xx")
  testharness.assert_equals(ev.bubbles, true)
  testharness.assert_equals(ev.cancelable, false)
  testharness.assert_equals(ev.sweet, undefined)
})
testharness.
test(function() {
  var ev = new CustomEvent.CustomEvent("$", {detail: 54, sweet: "x", sweet2: "x", cancelable:true})
  testharness.assert_equals(ev.type, "$")
  testharness.assert_equals(ev.bubbles, false)
  testharness.assert_equals(ev.cancelable, true)
  testharness.assert_equals(ev.sweet, undefined)
  testharness.assert_equals(ev.detail, 54)
})
