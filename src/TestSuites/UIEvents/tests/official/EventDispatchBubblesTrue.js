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
var document             = docload.loadDocument("EventDispatchBubblesTrue.html");
var window               = DOM.window;
var self                 = window.clone();
var testharness          = initTestHarness(DOM, Promise, this);
var performance          = new Performance.Performance();
window.document 		 = document;
document.browsingContext = window;


function concatReverse(a) {
    return a.concat(ArrayUtils.map(a, function(x) { return x }).reverse());
}

function targetsForDocumentChain(document) {
    return [
        document,
        document.documentElement,
        document.getElementsByTagName("body")[0],
        document.getElementById("table"),
        document.getElementById("table-body"),
        document.getElementById("parent")
    ];
}

function testChain(document, targetParents, phases, event_type) {
    var target = document.getElementById("target");
    var targets = targetParents.concat(target);
    var expected_targets = concatReverse(targets);

    var actual_targets = [], actual_phases = [];
    var test_event = function(evt) {
        actual_targets.push(evt.currentTarget);
        actual_phases.push(evt.eventPhase);
    }

    for (var i = 0; i < targets.length; i++) {
        targets[i].addEventListener(event_type, test_event, true);
        targets[i].addEventListener(event_type, test_event, false);
    }

    var evt = document.createEvent("Event");
    evt.initEvent(event_type, true, true);

    target.dispatchEvent(evt);

    testharness.assert_array_equals(actual_targets, expected_targets, "targets");
    testharness.assert_array_equals(actual_phases, phases, "phases");
}

var phasesForDocumentChain = [
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
];

testharness.
test(function () {
    var chainWithWindow = [window].concat(targetsForDocumentChain(document));
    var phases = [Event.CAPTURING_PHASE].concat(phasesForDocumentChain, Event.BUBBLING_PHASE);
    testChain(document, chainWithWindow, phases, "click");
}, "In window.document with click event");

testharness.
test(function () {
    testChain(document, targetsForDocumentChain(document), phasesForDocumentChain, "load");
}, "In window.document with load event")

testharness.
test(function () {
    var documentClone = document.cloneNode(true);
    testChain(
        documentClone, targetsForDocumentChain(documentClone), phasesForDocumentChain, "click");
}, "In window.document.cloneNode(true)");

testharness.
test(function () {
    var newDocument = new Document.Document();
    newDocument.appendChild(document.documentElement.cloneNode(true));
    testChain(
        newDocument, targetsForDocumentChain(newDocument), phasesForDocumentChain, "click");
}, "In new Document()");

testharness.
test(function () {
    var HTMLDocument = document.implementation.createHTMLDocument();
    HTMLDocument.body.appendChild(document.getElementById("table").cloneNode(true));
    testChain(
        HTMLDocument, targetsForDocumentChain(HTMLDocument), phasesForDocumentChain, "click");
}, "In DOMImplementation.createHTMLDocument()");
