const DOM                = initDOM();
const Event              = DOM.Event;
const CustomEvent        = DOM.CustomEvent;

const Promise            = initPromise().Promise;
var HTMLFiles            = initUIEventsFiles();
var docload              = initDocumentLoading(DOM, HTMLFiles);
var document             = docload.loadDocument("CustomEvent.html");
var window               = DOM.window;
var self                 = window.clone();
var testharness          = initTestHarness(DOM, Promise, this);


testharness.
test(function() {
  var type = "foo";

  var target = document.createElement("div");
  target.addEventListener(type, this.step_func(function(evt) {
    testharness.assert_equals(evt.type, type);
  }), true);

  var fooEvent = document.createEvent("CustomEvent");
  fooEvent.initEvent(type, true, true);
  target.dispatchEvent(fooEvent);
}, "CustomEvent dispatching.");

testharness.
test(function() {
    var e = document.createEvent("CustomEvent");
    testharness.assert_throws(new TypeError(), function() {
        e.initCustomEvent();
    });
}, "First parameter to initCustomEvent should be mandatory.");

testharness.
test(function() {
    var e = document.createEvent("CustomEvent");
    e.initCustomEvent("foo");
    testharness.assert_equals(e.type, "foo", "type");
    testharness.assert_false(e.bubbles, "bubbles");
    testharness.assert_false(e.cancelable, "cancelable");
    testharness.assert_equals(e.detail, null, "detail");
}, "initCustomEvent's default parameter values.");
