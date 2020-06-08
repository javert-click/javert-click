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

testharness.test(t => {
  let seen = false;
  const event = new Event.Event("hi");
  testharness.assert_equals(self.event, undefined);
  self.addEventListener("hi", t.step_func(e => {
    seen = true;
    console.log('going to call assert');
    testharness.assert_equals(self.event, undefined);
    console.log('1st assert passed');
    testharness.assert_equals(e, event);
  }));
  self.dispatchEvent(event);
  testharness.assert_true(seen);
}, "There's no self.event (that's why we call it window.event) in workers");
testharness.done();
