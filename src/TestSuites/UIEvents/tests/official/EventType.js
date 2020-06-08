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
var document             = docload.loadDocument("EventType.html");
var window               = DOM.window;
var self                 = window.clone();
var testharness          = initTestHarness(DOM, Promise, this);
var performance          = new Performance.Performance();
window.document 		 = document;
document.browsingContext = window;

testharness.
test(function() {
  var e = document.createEvent("Event")
  testharness.assert_equals(e.type, "");
}, "Event.type should initially be the empty string");
testharness.
test(function() {
  var e = document.createEvent("Event")
  e.initEvent("foo", false, false)
  testharness.assert_equals(e.type, "foo")
}, "Event.type should be initialized by initEvent");
testharness.
test(function() {
  var e = new Event.Event("bar")
  testharness.assert_equals(e.type, "bar")
}, "Event.type should be initialized by the constructor");
