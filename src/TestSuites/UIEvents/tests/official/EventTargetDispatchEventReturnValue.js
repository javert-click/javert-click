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
var document             = docload.loadDocument("EventTargetDispatchEventReturnValue.html");
var window               = DOM.window;
var self                 = window.clone();
var testharness          = initTestHarness(DOM, Promise, this);
var performance          = new Performance.Performance();
window.document 		 = document;
document.browsingContext = window;


testharness.
test(function() {
    var event_type = "foo";
    var target = document.getElementById("target");
    var parent = document.getElementById("parent");
    var default_prevented;
    var return_value;

    parent.addEventListener(event_type, function(e) {}, true);
    target.addEventListener(event_type, function(e) {
        evt.preventDefault();
        default_prevented = evt.defaultPrevented;
        return_value = evt.returnValue;
    }, true);
    target.addEventListener(event_type, function(e) {}, true);

    var evt = document.createEvent("Event");
    evt.initEvent(event_type, true, true);

    testharness.assert_true(parent.dispatchEvent(evt));
    testharness.assert_false(target.dispatchEvent(evt));
    testharness.assert_true(default_prevented);
    testharness.assert_false(return_value);
}, "Return value of EventTarget.dispatchEvent() affected by preventDefault().");

testharness.
test(function() {
    var event_type = "foo";
    var target = document.getElementById("target");
    var parent = document.getElementById("parent");
    var default_prevented;
    var return_value;

    parent.addEventListener(event_type, function(e) {}, true);
    target.addEventListener(event_type, function(e) {
        evt.returnValue = false;
        default_prevented = evt.defaultPrevented;
        return_value = evt.returnValue;
    }, true);
    target.addEventListener(event_type, function(e) {}, true);

    var evt = document.createEvent("Event");
    evt.initEvent(event_type, true, true);

    testharness.assert_true(parent.dispatchEvent(evt));
    testharness.assert_false(target.dispatchEvent(evt));
    testharness.assert_true(default_prevented);
    testharness.assert_false(return_value);
}, "Return value of EventTarget.dispatchEvent() affected by returnValue.");
