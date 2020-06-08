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
var document             = docload.loadDocument("EventListenerOptionsCapture.html");
var window               = DOM.window;
var self                 = window.clone();
var testharness          = initTestHarness(DOM, Promise, this);
var performance          = new Performance.Performance();
window.document 		 = document;
document.browsingContext = window;



function testCaptureValue(captureValue, expectedValue) {
  var handlerPhase = undefined;
  var handler = function handler(e) {
    testharness.assert_equals(handlerPhase, undefined, "Handler invoked after remove");
    handlerPhase = e.eventPhase;
  }
  document.addEventListener('test', handler, captureValue);
  
  document.body.dispatchEvent(new Event.Event('test', {bubbles: true}));
  document.removeEventListener('test', handler, captureValue);
  document.body.dispatchEvent(new Event.Event('test', {bubbles: true}));
  testharness.assert_equals(handlerPhase, expectedValue, "Incorrect event phase for value: "); //+ JSON.stringify(captureValue));
}

testharness.
test(function() {
  testCaptureValue(true, Event.CAPTURING_PHASE);
  testCaptureValue(false, Event.BUBBLING_PHASE);
  testCaptureValue(null, Event.BUBBLING_PHASE);
  testCaptureValue(undefined, Event.BUBBLING_PHASE);
  testCaptureValue(2.3, Event.CAPTURING_PHASE);
  testCaptureValue(-1000.3, Event.CAPTURING_PHASE);
  testCaptureValue(NaN, Event.BUBBLING_PHASE);
  testCaptureValue(+0.0, Event.BUBBLING_PHASE);
  testCaptureValue(-0.0, Event.BUBBLING_PHASE);
  testCaptureValue("", Event.BUBBLING_PHASE);
  testCaptureValue("AAAA", Event.CAPTURING_PHASE);
}, "Capture boolean should be honored correctly");

testharness.
test(function() {
  testCaptureValue({}, Event.BUBBLING_PHASE);
  testCaptureValue({capture:true}, Event.CAPTURING_PHASE);
  testCaptureValue({capture:false}, Event.BUBBLING_PHASE);
  testCaptureValue({capture:2}, Event.CAPTURING_PHASE);
  testCaptureValue({capture:0}, Event.BUBBLING_PHASE);
}, "Capture option should be honored correctly");

testharness.
test(function() {
  var supportsCapture = false;
  var query_options = {
    get capture() {
      supportsCapture = true;
      return false;
    },
    get dummy() {
      testharness.assert_unreached("dummy value getter invoked");
      return false;
    }
  };

  document.addEventListener('test_event', null, query_options);
  testharness.assert_true(supportsCapture, "addEventListener doesn't support the capture option");
  supportsCapture = false;
  document.removeEventListener('test_event', null, query_options);
  testharness.assert_true(supportsCapture, "removeEventListener doesn't support the capture option");
}, "Supports capture option");

function testOptionEquality(addOptionValue, removeOptionValue, expectedEquality) {
  var handlerInvoked = false;
  var handler = function handler(e) {
    testharness.assert_equals(handlerInvoked, false, "Handler invoked multiple times");
    handlerInvoked = true;
  }
  document.addEventListener('test', handler, addOptionValue);
  document.removeEventListener('test', handler, removeOptionValue);
  document.body.dispatchEvent(new Event.Event('test', {bubbles: true}));
  testharness.assert_equals(!handlerInvoked, expectedEquality, "equivalence of options ") //+
    //JSON.stringify(addOptionValue) + " and " + JSON.stringify(removeOptionValue));
  if (handlerInvoked)
    document.removeEventListener('test', handler, addOptionValue);
}

testharness.
test(function() {
  // Option values that should be treated as equivalent
  testOptionEquality({}, false, true);
  testOptionEquality({capture: false}, false, true);
  testOptionEquality(true, {capture: true}, true);
  testOptionEquality({capture: null}, undefined, true);
  testOptionEquality({capture: true}, {dummy: false, capture: 1}, true);
  testOptionEquality({dummy: true}, false, true);

  // Option values that should be treated as distinct
  testOptionEquality(true, false, false);
  testOptionEquality(true, {capture:false}, false);
  testOptionEquality({}, true, false);

}, "Equivalence of option values");

