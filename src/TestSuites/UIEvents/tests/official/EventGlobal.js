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
var document             = docload.loadDocument("EventGlobal.html");
var window               = DOM.window;
var self                 = window.clone();
var testharness          = initTestHarness(DOM, Promise, this);
var performance          = new Performance.Performance();
window.document 		 = document;
document.browsingContext = window;


testharness.
test(t => {
  testharness.assert_own_property(window, "event");
  testharness.assert_equals(window.event, undefined);
}, "event exists on window, which is initially set to undefined");


testharness.async_test(t => {
  let target = document.createElement("div");
  testharness.assert_equals(window.event, undefined, "undefined before dispatch");

  let clickEvent = new Event.Event("click");
  target.addEventListener("click", t.step_func_done(e => {
    testharness.assert_equals(window.event, clickEvent, "window.event set to current event during dispatch");
  }));

  target.dispatchEvent(clickEvent);
  testharness.assert_equals(window.event, undefined, "undefined after dispatch");
}, "window.event is only defined during dispatch");


testharness.async_test(t => {
  let parent = document.createElement("div");
  let root = parent.attachShadow({mode: "closed"});
  let span = document.createElement("span");
  root.appendChild(span);

  span.addEventListener("test", t.step_func(e => {
    testharness.assert_equals(window.event, undefined);
    assert_not_equals(window.event, e);
  }));

  parent.addEventListener("test", t.step_func_done(e => {
    testharness.assert_equals(window.event, e);
    assert_not_equals(window.event, undefined);
  }));

  parent.dispatchEvent(new Event.Event("test", {composed: true}));
}, "window.event is undefined if the target is in a shadow tree (event dispatched outside shadow tree)");


testharness.async_test(t => {
  let parent = document.createElement("div");
  let root = parent.attachShadow({mode: "closed"});
  let span = document.createElement("span");
  root.appendChild(span);
  let shadowNode = root.firstElementChild;

  shadowNode.addEventListener("test", t.step_func((e) => {
    assert_not_equals(window.event, e);
    testharness.assert_equals(window.event, undefined);
  }));

  parent.addEventListener("test", t.step_func_done(e => {
    testharness.assert_equals(window.event, e);
    assert_not_equals(window.event, undefined);
  }));

  shadowNode.dispatchEvent(new Event.Event("test", {composed: true, bubbles: true}));
}, "window.event is undefined if the target is in a shadow tree (event dispatched inside shadow tree)");


testharness.async_test(t => {
  let target1 = document.createElement("div");
  let target2 = document.createElement("div");

  target2.addEventListener("dude", t.step_func(() => {
    testharness.assert_equals(window.event.type, "dude");
  }));

  target1.addEventListener("cool", t.step_func_done(() => {
    testharness.assert_equals(window.event.type, "cool", "got expected event from global event during dispatch");
    target2.dispatchEvent(new Event.Event("dude"));
    testharness.assert_equals(window.event.type, "cool", "got expected event from global event after handling a different event handler callback");
  }));

  target1.dispatchEvent(new Event.Event("cool"));
}, "window.event is set to the current event during dispatch");


testharness.async_test(t => {
  let target = document.createElement("div");

  target.addEventListener("click", t.step_func_done(e => {
    testharness.assert_equals(e, window.event);
  }));

  target.dispatchEvent(new Event.Event("click"));
}, "window.event is set to the current event, which is the event passed to dispatch");
