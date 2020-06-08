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
var document             = docload.loadDocument("EventDispatchHandlersChanged.html");
var window               = DOM.window;
var self                 = window.clone();
var testharness          = initTestHarness(DOM, Promise, this);
var performance          = new Performance.Performance();
window.document 		 = document;
document.browsingContext = window;

testharness.test(function() {
    var desc1 = Object.getOwnPropertyDescriptor(new Event.Event("x"), "isTrusted");
    testharness.assert_not_equals(desc1, undefined) ;
    testharness.assert_equals(typeof desc1.get, "function");
  
    var desc2 = Object.getOwnPropertyDescriptor(new Event.Event("x"), "isTrusted");
    testharness.assert_not_equals(desc2, undefined);
    testharness.assert_equals(typeof desc2.get, "function");
  
    testharness.assert_equals(desc1.get, desc2.get);
  });