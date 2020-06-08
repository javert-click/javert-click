const DOM                = initDOM();
const Event              = DOM.Event;
const CustomEvent        = DOM.CustomEvent;
const Document           = DOM.Document;
const Text               = DOM.Text;
const MouseEvent         = DOM.MouseEvent;
const KeyboardEvent      = DOM.KeyboardEvent;
const UIEvent            = DOM.UIEvent;
const Performance        = DOM.Performance;

const Promise            = initPromise().Promise;
var HTMLFiles            = initUIEventsFiles();
var docload              = initDocumentLoading(DOM, HTMLFiles);
var document             = docload.loadDocument("EventDispatchDetachedClick.html");
var window               = DOM.window;
var self                 = window.clone();
var testharness          = initTestHarness(DOM, Promise, this);
var performance          = new Performance.Performance();
window.document 		 = document;
document.browsingContext = window;


testharness.
test(function() {
  var EVENT = "click";
  var TARGET = document.createElement("somerandomelement");
  var t = 
testharness.async_test("Click event can be dispatched to an element that is not in the document.")
  TARGET.addEventListener(EVENT, t.step_func(function(evt) {
    testharness.assert_equals(evt.target, TARGET);
    testharness.assert_equals(evt.srcElement, TARGET);
    t.done();
  }), true);
  var e = document.createEvent("Event");
  e.initEvent(EVENT, true, true);
  TARGET.dispatchEvent(e);
});
