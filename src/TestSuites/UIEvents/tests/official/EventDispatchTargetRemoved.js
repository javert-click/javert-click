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
var document             = docload.loadDocument("EventDispatchTargetRemoved.html");
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
    var tbody = document.getElementById("table-body");
    var table = document.getElementById("table");
    var body = document.body;
    var html = document.documentElement;
    var targets = [window, document, html, body, table, tbody, parent, target];
    var expected_targets = targets.concat([target, parent, tbody, table, body, html, document, window]);
    var phases = [
        Event.CAPTURING_PHASE,
        Event.CAPTURING_PHASE,
        Event.CAPTURING_PHASE,
        Event.CAPTURING_PHASE,
        Event.CAPTURING_PHASE,
        Event.CAPTURING_PHASE,
        Event.CAPTURING_PHASE,
        Event.AT_TARGET,
        Event.AT_TARGET,
        Event.BUBBLING_PHASE,
        Event.BUBBLING_PHASE,
        Event.BUBBLING_PHASE,
        Event.BUBBLING_PHASE,
        Event.BUBBLING_PHASE,
        Event.BUBBLING_PHASE,
        Event.BUBBLING_PHASE,
    ];

    var actual_targets = [], actual_phases = [];
    var test_event = this.step_func(function(evt) {
        if (parent === target.parentNode) {
            parent.removeChild(target);
        }

        actual_targets.push(evt.currentTarget);
        actual_phases.push(evt.eventPhase);
    });

    for (var i = 0; i < targets.length; i++) {
        targets[i].addEventListener(event_type, test_event, true);
        targets[i].addEventListener(event_type, test_event, false);
    }

    var evt = document.createEvent("Event");
    evt.initEvent(event_type, true, true);
    target.dispatchEvent(evt);

    testharness.assert_array_equals(actual_targets, expected_targets, "targets");
    testharness.assert_array_equals(actual_phases, phases, "phases");
}, "Event propagation path when an element in it is removed from the DOM");
