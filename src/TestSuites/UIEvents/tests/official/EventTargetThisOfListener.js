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
var document             = docload.loadDocument("EventDispatchClick.html");
var window               = DOM.window;
var self                 = window.clone();
var testharness          = initTestHarness(DOM, Promise, this);
var performance          = new Performance.Performance();
window.document 		 = document;
document.browsingContext = window;

testharness.test(() => {
  const nodes = [
    document.createElement("p"),
    document.createTextNode("some text"),
    document.createDocumentFragment(),
    document.createComment("a comment"),
    document.createProcessingInstruction("target", "data")
  ];

  let callCount = 0;
  
  for(var i = 0; i < nodes.length; i++){
    var node = nodes[i];
    node.addEventListener("someevent", function () {
      ++callCount;
      testharness.assert_equals(this, node);
    });

    node.dispatchEvent(new CustomEvent.CustomEvent("someevent"));
  }

  testharness.assert_equals(callCount, nodes.length);

}, "the this value inside the event listener callback should be the node");

testharness.test(() => {

  const nodes = [
    document.createElement("p"),
    document.createTextNode("some text"),
    document.createDocumentFragment(),
    document.createComment("a comment"),
    document.createProcessingInstruction("target", "data")
  ];
  
  let callCount = 0;
  for(var i = 0; i < nodes.length; i++){
    var node = nodes[i];
    const handler = {
      handleEvent() {
        ++callCount;
        testharness.assert_equals(this, handler);
      }
    };

    node.addEventListener("someevent", handler);

    node.dispatchEvent(new CustomEvent.CustomEvent("someevent"));
  }

  testharness.assert_equals(callCount, nodes.length);

}, "the this value inside the event listener object handleEvent should be the object");

testharness.test(() => {

  const nodes = [
    document.createElement("p"),
    document.createTextNode("some text"),
    document.createDocumentFragment(),
    document.createComment("a comment"),
    document.createProcessingInstruction("target", "data")
  ];

  let callCount = 0;
  for(var i = 0; i < nodes.length; i++){
    var node = nodes[i];
    const handler = {
      handleEvent() {
        testharness.assert_unreached("should not call the old handleEvent method");
      }
    };

    node.addEventListener("someevent", handler);
    handler.handleEvent = function () {
      ++callCount;
      testharness.assert_equals(this, handler);
    };

    node.dispatchEvent(new CustomEvent.CustomEvent("someevent"));
  }

  testharness.assert_equals(callCount, nodes.length);

}, "dispatchEvent should invoke the current handleEvent method of the object");

testharness.test(() => {

  const nodes = [
    document.createElement("p"),
    document.createTextNode("some text"),
    document.createDocumentFragment(),
    document.createComment("a comment"),
    document.createProcessingInstruction("target", "data")
  ];

  let callCount = 0;
  for(var i = 0; i < nodes.length; i++){
    var node = nodes[i];
    const handler = {};

    node.addEventListener("someevent", handler);
    handler.handleEvent = function () {
      ++callCount;
      testharness.assert_equals(this, handler);
    };

    node.dispatchEvent(new CustomEvent.CustomEvent("someevent"));
  }

  testharness.assert_equals(callCount, nodes.length);

}, "addEventListener should not require handleEvent to be defined on object listeners");

testharness.test(() => {

  const nodes = [
    document.createElement("p"),
    document.createTextNode("some text"),
    document.createDocumentFragment(),
    document.createComment("a comment"),
    document.createProcessingInstruction("target", "data")
  ];

  let callCount = 0;
  for(var i = 0; i < nodes.length; i++){
    var node = nodes[i];
    function handler() {
      ++callCount;
      testharness.assert_equals(this, node);
    }

    handler.handleEvent = () => {
      testharness.assert_unreached("should not call the handleEvent method on a function");
    };

    node.addEventListener("someevent", handler);

    node.dispatchEvent(new CustomEvent.CustomEvent("someevent"));
  }

  testharness.assert_equals(callCount, nodes.length);

}, "handleEvent properties added to a function before addEventListener are not reached");

testharness.test(() => {

  const nodes = [
    document.createElement("p"),
    document.createTextNode("some text"),
    document.createDocumentFragment(),
    document.createComment("a comment"),
    document.createProcessingInstruction("target", "data")
  ];

  let callCount = 0;
  for(var i = 0; i < nodes.length; i++){
    var node = nodes[i];
    function handler() {
      ++callCount;
      testharness.assert_equals(this, node);
    }

    node.addEventListener("someevent", handler);

    handler.handleEvent = () => {
      testharness.assert_unreached("should not call the handleEvent method on a function");
    };

    node.dispatchEvent(new CustomEvent.CustomEvent("someevent"));
  }

  testharness.assert_equals(callCount, nodes.length);

}, "handleEvent properties added to a function after addEventListener are not reached");
