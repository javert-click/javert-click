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
var document             = docload.loadDocument("EventTimestampHighResolution.html");
var window               = DOM.window;
var self                 = window.clone();
var testharness          = initTestHarness(DOM, Promise, this);
var performance          = new Performance.Performance();
window.document 		 = document;
document.browsingContext = window;


'use strict';
var events = ["MouseEvent", "KeyboardEvent", "WheelEvent", "GamepadEvent", "FocusEvent"];
for (var i = 0; i < events.length; i++) {
var eventType = events[i];   
testharness. test(function() {
        let before = performance.now();
        let e = new window[eventType]('test');
        let after = performance.now();
        testharness.assert_greater_than_equal(e.timeStamp, before, "Event timestamp should be greater than performance.now() timestamp taken before its creation");
        testharness.assert_less_than_equal(e.timeStamp, after, "Event timestamp should be less than performance.now() timestamp taken after its creation");
    }, `Constructed ${eventType} timestamp should be high resolution and have the same time origin as performance.now()`);
}
