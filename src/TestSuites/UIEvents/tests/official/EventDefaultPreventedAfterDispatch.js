const DOM                = initDOM();
const Event              = DOM.Event;
const CustomEvent        = DOM.CustomEvent;

const Promise            = initPromise().Promise;
var HTMLFiles            = initUIEventsFiles();
var docload              = initDocumentLoading(DOM, HTMLFiles);
var document             = docload.loadDocument("EventDefaultPreventedAfterDispatch.html");
var window               = DOM.window;
var self                 = window.clone();
var testharness          = initTestHarness(DOM, Promise, this);


testharness.
test(function() {
    var EVENT = "foo";
    var TARGET = document.getElementById("target");
    var evt = document.createEvent("Event");
    evt.initEvent(EVENT, true, true);

    TARGET.addEventListener(EVENT, this.step_func(function(e) {
        e.preventDefault();
        testharness.assert_true(e.defaultPrevented, "during dispatch");
    }), true);
    TARGET.dispatchEvent(evt);

    testharness.assert_true(evt.defaultPrevented, "after dispatch");
    testharness.assert_equals(evt.target, TARGET);
    testharness.assert_equals(evt.srcElement, TARGET);
}, "Default prevention via preventDefault");

testharness.
test(function() {
    var EVENT = "foo";
    var TARGET = document.getElementById("target");
    var evt = document.createEvent("Event");
    evt.initEvent(EVENT, true, true);

    TARGET.addEventListener(EVENT, this.step_func(function(e) {
        e.returnValue = false;
        testharness.assert_true(e.defaultPrevented, "during dispatch");
    }), true);
    TARGET.dispatchEvent(evt);

    testharness.assert_true(evt.defaultPrevented, "after dispatch");
    testharness.assert_equals(evt.target, TARGET);
    testharness.assert_equals(evt.srcElement, TARGET);
}, "Default prevention via returnValue");
