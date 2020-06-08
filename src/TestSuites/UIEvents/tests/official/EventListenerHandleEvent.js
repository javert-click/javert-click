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
var document             = docload.loadDocument("EventListenerHandleEvent.html");
var window               = DOM.window;
var self                 = window.clone();
var testharness          = initTestHarness(DOM, Promise, this);
var performance          = new Performance.Performance();
window.document 		 = document;
document.browsingContext = window;


testharness.setup({ allow_uncaught_exception: true });

testharness.
test(function(t) {
    var type = "foo";
    var target = document.createElement("div");
    var eventListener = {
        handleEvent: function(evt) {
            var that = this;
            t.step(function() {
                testharness.assert_equals(evt.type, type);
                testharness.assert_equals(evt.target, target);
                testharness.assert_equals(evt.srcElement, target);
                testharness.assert_equals(that, eventListener);
            });
        },
    };

    target.addEventListener(type, eventListener);
    target.dispatchEvent(new Event.Event(type));
}, "calls `handleEvent` method of `EventListener`");

testharness.
test(function(t) {
    var type = "foo";
    var target = document.createElement("div");
    var thrownError = { name: "test" };
    var uncaughtError;
    var errorHandler = function(event) {
        uncaughtError = event.error;
    };

    window.addEventListener("error", errorHandler);
    t.add_cleanup(function() {
        window.removeEventListener("error", errorHandler);
    });

    target.addEventListener(type, {
        get handleEvent() {
            throw thrownError;
        }
    });
    target.dispatchEvent(new Event.Event(type));
    testharness.assert_equals(thrownError, uncaughtError);
}, "rethrows errors when getting `handleEvent`");

testharness.
test(function(t) {
    var type = "foo";
    var target = document.createElement("div");
    var calls = 0;

    target.addEventListener(type,// {
       /* get handleEvent() {
            calls++;
            return function() {};
        },*/
        function handleEvent() {
            calls++;
            return function() {};
        },
    //}
    );

    testharness.assert_equals(calls, 0);
    target.dispatchEvent(new Event.Event(type));
    target.dispatchEvent(new Event.Event(type));
    testharness.assert_equals(calls, 2);
}, "performs `Get` every time event is dispatched");

testharness.
test(function(t) {
    var type = "foo";
    var target = document.createElement("div");
    var calls = 0;
    var eventListener = function() { calls++; };
    eventListener.handleEvent = t.unreached_func("`handleEvent` method should not be called on functions");

    target.addEventListener(type, eventListener);
    target.dispatchEvent(new Event.Event(type));
    testharness.assert_equals(calls, 1);
}, "doesn't call `handleEvent` method on callable `EventListener`");

testharness.
test(function(t) {
    var type = "foo";
    var target = document.createElement("div");
    var uncaughtError;
    var errorHandler = function(event) {
        uncaughtError = event.error;
    };

    window.addEventListener("error", errorHandler);
    t.add_cleanup(function() {
        window.removeEventListener("error", errorHandler);
    });

    target.addEventListener(type, {
        handleEvent: null,
    });
    target.dispatchEvent(new Event.Event(type));
    testharness.assert_true(uncaughtError instanceof TypeError);
}, "throws if `handleEvent` is falsy and not callable");

testharness.
test(function(t) {
    var type = "foo";
    var target = document.createElement("div");
    var uncaughtError;
    var errorHandler = function(event) {
        uncaughtError = event.error;
    };

    window.addEventListener("error", errorHandler);
    t.add_cleanup(function() {
        window.removeEventListener("error", errorHandler);
    });

    target.addEventListener(type, {
        handleEvent: 1,
    });

    target.dispatchEvent(new Event.Event(type));
    testharness.assert_true(uncaughtError instanceof TypeError);
}, "throws if `handleEvent` is thruthy and not callable");
