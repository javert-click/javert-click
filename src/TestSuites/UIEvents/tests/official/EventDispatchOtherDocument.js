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
var document             = docload.loadDocument("EventDispatchOtherDocument.html");
var window               = DOM.window;
var self                 = window.clone();
var testharness          = initTestHarness(DOM, Promise, this);
var performance          = new Performance.Performance();
window.document 		 = document;
document.browsingContext = window;


testharness.
test(function() {
  var doc = document.implementation.createHTMLDocument("Demo");
  var element = doc.createElement("div");
  var called = false;
  element.addEventListener("foo", this.step_func(function(ev) {
    testharness.assert_false(called);
    called = true;
    testharness.assert_equals(ev.target, element);
    testharness.assert_equals(ev.srcElement, element);
  }));
  doc.body.appendChild(element);

  var event = new Event.Event("foo");
  element.dispatchEvent(event);
  testharness.assert_true(called);
});
