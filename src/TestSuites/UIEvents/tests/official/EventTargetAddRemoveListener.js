const DOM                = initDOM();
const Event              = DOM.Event;
const CustomEvent        = DOM.CustomEvent;

const Promise            = initPromise().Promise;
var HTMLFiles            = initUIEventsFiles();
var docload              = initDocumentLoading(DOM, HTMLFiles);
var document             = docload.loadDocument("EventTargetAddRemoveListener.html");
var window               = DOM.window;
var self                 = window.clone();
var testharness          = initTestHarness(DOM, Promise, this);

function listener(evt) {
  evt.preventDefault();
  return false;
}

testharness.test(() => {
  document.addEventListener("x", listener, false);
  let event = new Event.Event("x", { cancelable: true });
  let ret = document.dispatchEvent(event);
  testharness.assert_false(ret);

  document.removeEventListener("x", listener);
  event = new Event.Event("x", { cancelable: true });
  ret = document.dispatchEvent(event);
  testharness.assert_true(ret);
}, "Removing an event listener without explicit capture arg should succeed");
