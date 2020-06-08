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
var document             = docload.loadDocument("EventPropagation.html");
var window               = DOM.window;
var self                 = window.clone();
var testharness          = initTestHarness(DOM, Promise, this);
var performance          = new Performance.Performance();
window.document 		 = document;
document.browsingContext = window;


"use strict";

function testPropagationFlag(ev, expected, desc) {
 
testharness. test(function() {
    var called = false;
    var callback = function() { called = true };
    this.add_cleanup(function() {
      document.head.removeEventListener("foo", callback)
    });
    document.head.addEventListener("foo", callback);
    document.head.dispatchEvent(ev);
    testharness.assert_equals(called, expected, "Propagation flag");
    // dispatchEvent resets the propagation flags so it will happily dispatch
    // the event the second time around.
    document.head.dispatchEvent(ev);
    testharness.assert_equals(called, true, "Propagation flag after first dispatch");
  }, desc);
}

var ev = document.createEvent("Event");
ev.initEvent("foo", true, false);
testPropagationFlag(ev, true, "Newly-created Event");
ev.stopPropagation();
testPropagationFlag(ev, false, "After stopPropagation()");
ev.initEvent("foo", true, false);
testPropagationFlag(ev, true, "Reinitialized after stopPropagation()");

var ev = document.createEvent("Event");
ev.initEvent("foo", true, false);
ev.stopImmediatePropagation();
testPropagationFlag(ev, false, "After stopImmediatePropagation()");
ev.initEvent("foo", true, false);
testPropagationFlag(ev, true, "Reinitialized after stopImmediatePropagation()");

var ev = document.createEvent("Event");
ev.initEvent("foo", true, false);
ev.cancelBubble = true;
testPropagationFlag(ev, false, "After cancelBubble=true");
ev.initEvent("foo", true, false);
testPropagationFlag(ev, true, "Reinitialized after cancelBubble=true");
