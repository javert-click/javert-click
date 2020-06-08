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
var document             = docload.loadDocument("EventTypeEmpty.html");
var window               = DOM.window;
var self                 = window.clone();
var testharness          = initTestHarness(DOM, Promise, this);
var performance          = new Performance.Performance();
window.document 		 = document;
document.browsingContext = window;


function do_test(t, e) {
  testharness.assert_equals(e.type, "", "type");
  testharness.assert_equals(e.bubbles, false, "bubbles");
  testharness.assert_equals(e.cancelable, false, "cancelable");

  var target = document.createElement("div");
  var handled = false;
  target.addEventListener("", t.step_func(function(e) {
    handled = true;
  }));
  testharness.assert_true(target.dispatchEvent(e));
  testharness.assert_true(handled);
}


testharness.async_test(function() {
  var e = document.createEvent("Event");
  e.initEvent("", false, false);
  do_test(this, e);
  this.done();
}, "initEvent");


testharness.async_test(function() {
  var e = new Event.Event("");
  do_test(this, e);
  this.done();
}, "Constructor");
