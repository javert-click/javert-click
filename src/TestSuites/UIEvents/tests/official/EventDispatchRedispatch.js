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
var document             = docload.loadDocument("EventDispatchRedispatch.html");
var window               = DOM.window;
var self                 = window.clone();
var testharness          = initTestHarness(DOM, Promise, this);
var performance          = new Performance.Performance();
window.document 		 = document;
document.browsingContext = window;


testharness.async_test(function() {
  var event;
  document.addEventListener("DOMContentLoaded", this.step_func(function(e) {
    testharness.assert_true(e.isTrusted, "Should be trusted when first handled");
    event = e;
  }), true);

  window.onload = this.step_func_done(function() {
    var received = 0;
    var target = document.createElement("span");
    target.addEventListener("DOMContentLoaded", this.step_func(function(e) {
      testharness.assert_false(e.isTrusted, "Should not be trusted during redispatching");
      ++received;
    }), true);
    testharness.assert_true(event.isTrusted, "Should be trusted before redispatching");
    target.dispatchEvent(event);
    testharness.assert_false(event.isTrusted, "Should not be trusted after redispatching");
    testharness.assert_equals(received, 1);
  });
});
