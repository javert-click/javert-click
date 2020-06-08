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
    const hostParent = document.createElement("section"),
          host = hostParent.appendChild(document.createElement("div")),
          shadowRoot = host.attachShadow({ mode: "closed" }),
          targetParent = shadowRoot.appendChild(document.createElement("p")),
          target = targetParent.appendChild(document.createElement("span")),
          path = [hostParent, host, shadowRoot, targetParent, target],
          expected = [],
          result = [];
    path.forEach((node, index) => {
      expected.splice(index, 0, "capturing " + node.nodeName);
      expected.splice(index + 1, 0, "bubbling " + node.nodeName);
    });
    path.forEach(node => {
      node.addEventListener("test", () => { result.push("bubbling " + node.nodeName) });
      node.addEventListener("test", () => { result.push("capturing " + node.nodeName) }, true);
    });
    target.dispatchEvent(new CustomEvent.CustomEvent('test', { detail: {}, bubbles: true, composed: true }));
    testharness.assert_array_equals(result, expected);
  });