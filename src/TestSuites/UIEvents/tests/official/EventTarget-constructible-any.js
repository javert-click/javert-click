"use strict"

const DOM                = initDOM();
const Event              = DOM.Event.Event;
const EventTarget        = DOM.EventTarget.EventTarget;
const CustomEvent        = DOM.CustomEvent.CustomEvent;
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
var document             = docload.loadDocument("EventTargetDispatchEvent.html");
var window               = DOM.window;
var self                 = window.clone();
var testharness          = initTestHarness(DOM, Promise, this);
var performance          = new Performance.Performance();
window.document 		 = document;
document.browsingContext = window;

testharness.test(() => {
  const target = new EventTarget();
  const event = new Event("foo", { bubbles: true, cancelable: false });
  let callCount = 0;

  function listener(e) {
    testharness.assert_equals(e, event);
    ++callCount;
  }

  target.addEventListener("foo", listener);

  target.dispatchEvent(event);
  testharness.assert_equals(callCount, 1);

  target.dispatchEvent(event);
  testharness.assert_equals(callCount, 2);

  target.removeEventListener("foo", listener);
  target.dispatchEvent(event);
  testharness.assert_equals(callCount, 2);
}, "A constructed EventTarget can be used as expected");

testharness.test(() => {
  var NicerEventTarget = function (tagName, document){
    EventTarget.call(this);
  };

  NicerEventTarget.prototype = Object.create(EventTarget.prototype);

  NicerEventTarget.prototype.on = function() {
    this.addEventListener.apply(this, arguments)
  }

  NicerEventTarget.prototype.off = function() {
    this.removeEventListener.apply(this, arguments)
  }

  NicerEventTarget.prototype.dispatch = function(type, detail) {
    this.dispatchEvent(new CustomEvent(type, { detail }));
  };

  const target = new NicerEventTarget();
  const event = new Event("foo", { bubbles: true, cancelable: false });
  const detail = "some data";
  let callCount = 0;

  function listener(e) {
    testharness.assert_equals(e.detail, detail);
    ++callCount;
  }

  target.on("foo", listener);

  target.dispatch("foo", detail);
  testharness.assert_equals(callCount, 1);

  target.dispatch("foo", detail);
  testharness.assert_equals(callCount, 2);

  target.off("foo", listener);
  target.dispatch("foo", detail);
  testharness.assert_equals(callCount, 2);
}, "EventTarget can be subclassed");
