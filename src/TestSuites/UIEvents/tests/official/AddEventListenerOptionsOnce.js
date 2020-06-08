const DOM                = initDOM();
const Event              = DOM.Event;
const CustomEvent        = DOM.CustomEvent;

const Promise            = initPromise().Promise;
var HTMLFiles            = initUIEventsFiles();
var docload              = initDocumentLoading(DOM, HTMLFiles);
var document             = docload.loadDocument("AddEventListenerOptionsOnce.html");
var window               = DOM.window;
var self                 = window.clone();
var testharness          = initTestHarness(DOM, Promise, this);

testharness.
test(function() {
  var invoked_once = false;
  var invoked_normal = false;
  function handler_once() {
    invoked_once = true;
  }
  function handler_normal() {
    invoked_normal = true;
  }

  document.addEventListener('test', handler_once, {once: true});
  document.addEventListener('test', handler_normal);
  document.dispatchEvent(new Event.Event('test'));
  testharness.assert_equals(invoked_once, true, "Once handler should be invoked");
  testharness.assert_equals(invoked_normal, true, "Normal handler should be invoked");

  invoked_once = false;
  invoked_normal = false;
  document.dispatchEvent(new Event.Event('test'));
  testharness.assert_equals(invoked_once, false, "Once handler shouldn't be invoked again");
  testharness.assert_equals(invoked_normal, true, "Normal handler should be invoked again");
  document.removeEventListener('test', handler_normal);
}, "Once listener should be invoked only once");

testharness.
test(function() {
  var invoked_count = 0;
  function handler() {
    invoked_count++;
    if (invoked_count == 1)
      document.dispatchEvent(new Event.Event('test'));
  }
  document.addEventListener('test', handler, {once: true});
  document.dispatchEvent(new Event.Event('test'));
  testharness.assert_equals(invoked_count, 1, "Once handler should only be invoked once");

  invoked_count = 0;
  function handler2() {
    invoked_count++;
    if (invoked_count == 1)
      document.addEventListener('test', handler2, {once: true});
    if (invoked_count <= 2)
      document.dispatchEvent(new Event.Event('test'));
  }
  document.addEventListener('test', handler2, {once: true});
  document.dispatchEvent(new Event.Event('test'));
  testharness.assert_equals(invoked_count, 2, "Once handler should only be invoked once after each adding");
}, "Once listener should be invoked only once even if the event is nested");

testharness.
test(function() {
  var invoked_count = 0;
  function handler() {
    invoked_count++;
  }

  document.addEventListener('test', handler, {once: true});
  document.addEventListener('test', handler);
  document.dispatchEvent(new Event.Event('test'));
  testharness.assert_equals(invoked_count, 1, "The handler should only be added once");

  invoked_count = 0;
  document.dispatchEvent(new Event.Event('test'));
  testharness.assert_equals(invoked_count, 0, "The handler was added as a once listener");

  invoked_count = 0;
  document.addEventListener('test', handler, {once: true});
  document.removeEventListener('test', handler);
  document.dispatchEvent(new Event.Event('test'));
  testharness.assert_equals(invoked_count, 0, "The handler should have been removed");
}, "Once listener should be added / removed like normal listeners");

