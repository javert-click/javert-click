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
var document             = docload.loadDocument("ShadowRelatedTarget.html");
var window               = DOM.window;
var self                 = window.clone();
var testharness          = initTestHarness(DOM, Promise, this);
var performance          = new Performance.Performance();
window.document 		 = document;
document.browsingContext = window;

var host = document.getElementById("host");
const root = host.attachShadow({ mode: "closed" });
var shadowInput = document.createElement("input");
shadowInput.setAttribute("id", "shadowInput");
root.appendChild(shadowInput);

testharness.async_test((test) => {
  //should this be root or document??
  var elem = root.getElementById("shadowInput");
  elem.focus();
  window.addEventListener("focus", test.step_func_done((e) => {
    testharness.assert_equals(e.relatedTarget, host);
  }, "relatedTarget should be pointing to shadow host."), true);
  var lightInput = document.getElementById("lightInput");
  lightInput.focus();
}, "relatedTarget should not leak at capturing phase, at window object.");

testharness.async_test((test) => {
  root.getElementById("shadowInput").focus();
  var lightInput = document.getElementById("lightInput");
  lightInput.addEventListener("focus", test.step_func_done((e) => {
    testharness.assert_equals(e.relatedTarget, host);
  }, "relatedTarget should be pointing to shadow host."), true);
  var lightInput = document.getElementById("lightInput");
  lightInput.focus();
}, "relatedTarget should not leak at target.");

