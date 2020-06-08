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
var document             = docload.loadDocument("EventDispatchMultipleStopPropagation.html");
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
    var actual_result;
    var test_event = function(evt) {
        actual_result.push(evt.currentTarget);

        if (parent == evt.currentTarget) {
            evt.stopPropagation();
        }
    };

    var evt = document.createEvent("Event");
    evt.initEvent(event_type, true, true);

    target.addEventListener(event_type, test_event, false);
    parent.addEventListener(event_type, test_event, false);
    document.addEventListener(event_type, test_event, false);
    window.addEventListener(event_type, test_event, false);

    actual_result = [];
    target.dispatchEvent(evt);
    testharness.assert_array_equals(actual_result, [target, parent]);

    actual_result = [];
    parent.dispatchEvent(evt);
    testharness.assert_array_equals(actual_result, [parent]);

    actual_result = [];
    document.dispatchEvent(evt);
    testharness.assert_array_equals(actual_result, [document, window]);
});


