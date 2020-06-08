const DOM                = initDOM();
const Event              = DOM.Event;
const CustomEvent        = DOM.CustomEvent;
const Document           = DOM.Document;
const Text               = DOM.Text;
const MouseEvent         = DOM.MouseEvent;
const KeyboardEvent      = DOM.KeyboardEvent;
const UIEvent            = DOM.UIEvent;
const Performance        = DOM.Performance;

const Promise            = initPromise().Promise;
var HTMLFiles            = initUIEventsFiles();
var docload              = initDocumentLoading(DOM, HTMLFiles);
var document             = docload.loadDocument("EventDispatchOrder.html");
var window               = DOM.window;
var self                 = window.clone();
var testharness          = initTestHarness(DOM, Promise, this);
var performance          = new Performance.Performance();
window.document 		 = document;
document.browsingContext = window;



testharness.async_test(function() {
    document.addEventListener('DOMContentLoaded', this.step_func_done(function() {
        var parent = document.getElementById('parent');
        var child = document.getElementById('child');

        var order = [];

        parent.addEventListener('click', this.step_func(function(){ order.push(1) }), true);
        child.addEventListener('click', this.step_func(function(){ order.push(2) }), false);
        parent.addEventListener('click', this.step_func(function(){ order.push(3) }), false);

        child.dispatchEvent(new Event.Event('click', {bubbles: true}));

        testharness.assert_array_equals(order, [1, 2, 3]);
    }));
}, "Event phases order");
