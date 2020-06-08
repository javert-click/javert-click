const DOM                = initDOM();
const Event              = DOM.Event;
const CustomEvent        = DOM.CustomEvent;

const Promise            = initPromise().Promise;
var HTMLFiles            = initUIEventsFiles();
var docload              = initDocumentLoading(DOM, HTMLFiles);
var document             = docload.loadDocument("EventDisabledDynamic.html");
var window               = DOM.window;
var self                 = window.clone();
var testharness          = initTestHarness(DOM, Promise, this);


testharness.async_test(t => {
  // NOTE: This test will timeout if it fails.
  window.addEventListener('load', t.step_func(() => {
    let e = document.querySelector('input');
    e.disabled = false;
    e.onclick = t.step_func_done(() => {});
    e.click();
  }));
}, "disabled is honored properly in presence of dynamic changes");
