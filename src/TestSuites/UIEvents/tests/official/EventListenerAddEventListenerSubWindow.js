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

testharness.async_test(function(t) {
    let crossOriginFrame = document.createElement('iframe');
    crossOriginFrame.src = 'https://{{hosts[alt][]}}:{{ports[https][0]}}/common/blank.html';
    document.body.appendChild(crossOriginFrame);
    crossOriginFrame.addEventListener('load', t.step_func_done(function() {
      let crossOriginWindow = crossOriginFrame.contentWindow;
      window.addEventListener('click', crossOriginWindow);
    }));
  }, "EventListener.addEventListener doesn't throw when a cross origin object is passed in.");