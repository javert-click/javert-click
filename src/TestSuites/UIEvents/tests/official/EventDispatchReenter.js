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
var document             = docload.loadDocument("EventDispatchReenter.html");
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
    var expected_targets = [
        window, document, html, body, table,
        target, parent, tbody,
        table, body, html, document, window,
        tbody, parent, target];
    var actual_targets = [];
    var expected_types = [
        "foo", "foo", "foo", "foo", "foo",
        "bar", "bar", "bar",
        "bar", "bar", "bar", "bar", "bar",
        "foo", "foo", "foo"
    ];

    var actual_targets = [], actual_types = [];
    var test_event = this.step_func(function(evt) {
        actual_targets.push(evt.currentTarget);
        actual_types.push(evt.type);

        if (table == evt.currentTarget && event_type == evt.type) {
            var e = document.createEvent("Event");
            e.initEvent("bar", true, true);
            target.dispatchEvent(e);
        }
    });

    for (var i = 0; i < targets.length; ++i) {
        targets[i].addEventListener(event_type, test_event, true);
        targets[i].addEventListener("bar", test_event, false);
    }

    var evt = document.createEvent("Event");
    evt.initEvent(event_type, false, true);
    target.dispatchEvent(evt);

    testharness.assert_array_equals(actual_targets, expected_targets, "actual_targets");
    testharness.assert_array_equals(actual_types, expected_types, "actual_types");
});
