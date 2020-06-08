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
var document             = docload.loadDocument("EventDispatchOmittedCapture.html");
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
    var targets = [
        target,
        document.getElementById("parent"),
        document.getElementById("table-body"),
        document.getElementById("table"),
        document.body,
        document.documentElement,
        document,
        window
    ];
    var phases = [
        Event.AT_TARGET,
        Event.BUBBLING_PHASE,
        Event.BUBBLING_PHASE,
        Event.BUBBLING_PHASE,
        Event.BUBBLING_PHASE,
        Event.BUBBLING_PHASE,
        Event.BUBBLING_PHASE,
        Event.BUBBLING_PHASE
    ];

    var actual_targets = [], actual_phases = [];
    var test_event = function(evt) {
        actual_targets.push(evt.currentTarget);
        actual_phases.push(evt.eventPhase);
    }

    for (var i = 0; i < targets.length; i++) {
        targets[i].addEventListener(event_type, test_event);
    }

    var evt = document.createEvent("Event");
    evt.initEvent(event_type, true, true);

    target.dispatchEvent(evt);

    for (var i = 0; i < targets.length; i++) {
        targets[i].removeEventListener(event_type, test_event);
    }

    target.dispatchEvent(evt);

    testharness.assert_array_equals(actual_targets, targets, "targets");
    testharness.assert_array_equals(actual_phases, phases, "phases");
}, "EventTarget.addEventListener with the capture argument omitted");
