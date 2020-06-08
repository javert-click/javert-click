
const DOM                = initDOM();
const Event              = DOM.Event;
const CustomEvent        = DOM.CustomEvent;

const Promise            = initPromise().Promise;
var HTMLFiles            = initUIEventsFiles();
var docload              = initDocumentLoading(DOM, HTMLFiles);
var document             = docload.loadDocument("EventStopImmediatePropagation.html");
var window               = DOM.window;
var self                 = window.clone();
var testharness          = initTestHarness(DOM, Promise, this);

testharness.setup({ single_test: true });

const target = document.querySelector('#target');
let timesCalled = 0;
target.addEventListener("test", e => {
  ++timesCalled;
  e.stopImmediatePropagation();
  testharness.assert_equals(e.cancelBubble, true, "The stop propagation flag must have been set");
});
target.addEventListener("test", () => {
  ++timesCalled;
});

const e = new Event.Event("test");
target.dispatchEvent(e);
testharness.assert_equals(timesCalled, 1, "The second listener must not have been called");

testharness.done();
