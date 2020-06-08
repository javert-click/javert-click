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
var document             = docload.loadDocument("EventDispatchHandlersChanged.html");
var window               = DOM.window;
var self                 = window.clone();
var testharness          = initTestHarness(DOM, Promise, this);
var performance          = new Performance.Performance();
window.document 		 = document;
document.browsingContext = window;

testharness.test(t => {
    const input = document.body.appendChild(document.createElement('input'));
    input.type = "radio";
    t.add_cleanup(() => input.remove());
    const clickEvent = new MouseEvent.MouseEvent('click', { button: 0, which: 1 });
    input.addEventListener('change', t.step_func(() => {
      testharness.assert_equals(clickEvent.eventPhase, Event.NONE);
    }));
    input.dispatchEvent(clickEvent);
  }, "Use NONE phase during legacy-pre-activation behavior");