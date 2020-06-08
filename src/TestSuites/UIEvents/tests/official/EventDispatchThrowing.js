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
var document             = docload.loadDocument("EventDispatchThrowing.html");
var window               = DOM.window;
var self                 = window.clone();
var testharness          = initTestHarness(DOM, Promise, this);
var performance          = new Performance.Performance();
window.document 		 = document;
document.browsingContext = window;


testharness.setup({allow_uncaught_exception:true})

testharness.
test(function() {
    var errorEvents = 0;
    window.onerror = this.step_func(function(e) {
        testharness.assert_equals(typeof e, 'string');
        ++errorEvents;
    });
    var element = document.createElement('div');

    element.addEventListener('click', function() {
        throw new Error('Error from only listener');
    });

    element.dispatchEvent(new Event.Event('click'));

    testharness.assert_equals(errorEvents, 1);
}, "Throwing in event listener with a single listeners");

testharness.
test(function() {
    var errorEvents = 0;
    window.onerror = this.step_func(function(e) {
        testharness.assert_equals(typeof e, 'string');
        ++errorEvents;
    });

    var element = document.createElement('div');

    var secondCalled = false;

    element.addEventListener('click', function() {
        throw new Error('Error from first listener');
    });
    element.addEventListener('click', this.step_func(function() {
        secondCalled = true;
    }), false);

    element.dispatchEvent(new Event.Event('click'));

    testharness.assert_equals(errorEvents, 1);
    testharness.assert_true(secondCalled);
}, "Throwing in event listener with multiple listeners");
