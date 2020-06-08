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
var self                 = window;
var testharness          = initTestHarness(DOM, Promise, this);
var performance          = new Performance.Performance();
window.document 		 = document;
document.browsingContext = window;

testharness.test(t => {
    const input = document.body.appendChild(document.createElement('input'));
    const div = input.appendChild(document.createElement('div'));
    input.type = "radio";

    const clickInput = new MouseEvent.MouseEvent('click');
    const clickDiv = new MouseEvent.MouseEvent('click');
    clickInput.touchTargets.push({});
    input.addEventListener('click', function(event){
      testharness.assert_equals(event.target, input);
    });
    div.addEventListener('click', function(event){
      testharness.assert_equals(event.target, input);
    })
    clickInput.initEvent('click', true, false);
    clickDiv.initEvent('click', true, false);
    input.dispatchEvent(clickInput);
    div.dispatchEvent(clickDiv);
  }, "Use NONE phase during legacy-pre-activation behavior");

  testharness.async_test(t => {
    let parent = document.createElement("input");
    parent.type = "radio";
    let root = parent.attachShadow({mode: "closed"});
    let span = document.createElement("span");
    root.appendChild(span);
    let shadowNode = root.firstElementChild;
  
    shadowNode.addEventListener("click", t.step_func((e) => {
      assert_not_equals(window.event, e);
      testharness.assert_equals(window.event, undefined);
    }));
  
    parent.addEventListener("click", t.step_func_done(e => {
      testharness.assert_equals(window.event, e);
      assert_not_equals(window.event, undefined);
    }));
    console.log('going to call dispatch');
    shadowNode.dispatchEvent(new MouseEvent.MouseEvent("click", {composed: true, bubbles: true}));
  }, "window.event is undefined if the target is in a shadow tree (event dispatched inside shadow tree)");
  