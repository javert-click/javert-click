const DOM                = initDOM();
const Event              = DOM.Event;
const CustomEvent        = DOM.CustomEvent;
const Document           = DOM.Document;
const Text               = DOM.Text;
const MouseEvent         = DOM.MouseEvent;
const KeyboardEvent      = DOM.KeyboardEvent;
const UIEvent            = DOM.UIEvent;
const Performance        = DOM.Performance;
const HTMLSlotElement    = DOM.HTMLSlotElement;

const Promise            = initPromise().Promise;
var HTMLFiles            = initUIEventsFiles();
var docload              = initDocumentLoading(DOM, HTMLFiles);
var document             = docload.loadDocument("EventDispatchClick.html");
var window               = DOM.window;
var self                 = window;
var testharness          = initTestHarness(DOM, Promise, this);
var performance          = new Performance.Performance();
window.document 		 = document;
document.browsingContext = window;


var dump = document.getElementById("dump")


testharness.async_test(function(t) {
  var input = document.createElement("input")
  var slot = new HTMLSlotElement.HTMLSlotElement("slot", document);
  input.slot = slot;
  input.type = "checkbox"
  dump.appendChild(input)
  input.addEventListener("click", t.step_func_done(function() {
    testharness.assert_true(!input.checked)
  }));
  input.dispatchEvent(new Event.Event("click"), {
    legacyTargetOverrideFlag: true,
    legacyOutputDidListenersThrowFlag: true
  })
}, "basic click event with flags activated")



