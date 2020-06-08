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
var document             = docload.loadDocument("EventDispatchOrderAtTarget.html");
var window               = DOM.window;
var self                 = window.clone();
var testharness          = initTestHarness(DOM, Promise, this);
var performance          = new Performance.Performance();
window.document 		 = document;
document.browsingContext = window;


testharness.test(() => {
    const el = document.createElement("div");
    const expectedOrder = ["capturing", "bubbling"];
    var actualOrder = [];
    el.addEventListener("click", evt => {
        testharness.assert_equals(evt.eventPhase, Event.AT_TARGET);
        actualOrder.push("bubbling");
    }, false);
    el.addEventListener("click", evt => {
        testharness.assert_equals(evt.eventPhase, Event.AT_TARGET);
        actualOrder.push("capturing");
    }, true);
    el.dispatchEvent(new Event.Event("click", {bubbles: true}));
    assert_array_equals(actualOrder, expectedOrder, "bubbles: true");
    actualOrder = [];
    el.dispatchEvent(new Event.Event("click", {bubbles: false}));
    testharness.assert_array_equals(actualOrder, expectedOrder, "bubbles: false");
}, "Listeners are invoked in correct order (AT_TARGET phase)");
