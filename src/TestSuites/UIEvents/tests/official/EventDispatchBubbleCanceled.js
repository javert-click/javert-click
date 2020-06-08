const DOM                = initDOM();
const Event              = DOM.Event;
const CustomEvent        = DOM.CustomEvent;

const Promise            = initPromise().Promise;
var HTMLFiles            = initUIEventsFiles();
var docload              = initDocumentLoading(DOM, HTMLFiles);
var document             = docload.loadDocument("EventDispatchBubbleCanceled.html");
var window               = DOM.window;
var self                 = window.clone();
var testharness          = initTestHarness(DOM, Promise, this);


testharness.
test(function() {
    var event = "foo";
    var target = document.getElementById("target");
    var parent = document.getElementById("parent");
    var tbody = document.getElementById("table-body");
    var table = document.getElementById("table");
    var body = document.body;
    var html = document.documentElement;
    var current_targets = [window, document, html, body, table, tbody, parent, target];
    var expected_targets = [];
    var actual_targets = [];
    var expected_phases = [];
    var actual_phases = [];

    var test_event = function(evt) {
        actual_targets.push(evt.currentTarget);
        actual_phases.push(evt.eventPhase);
    };

    for (var i = 0; i < current_targets.length; ++i) {
        current_targets[i].addEventListener(event, test_event, true);
        current_targets[i].addEventListener(event, test_event, false);
    }

    var evt = document.createEvent("Event");
    evt.initEvent(event, true, true);
    evt.cancelBubble = true;
    target.dispatchEvent(evt);

    testharness.assert_array_equals(actual_targets, expected_targets, "actual_targets");
    testharness.assert_array_equals(actual_phases, expected_phases, "actual_phases");
});
