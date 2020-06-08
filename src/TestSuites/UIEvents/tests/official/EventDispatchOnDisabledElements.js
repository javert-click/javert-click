const DOM                = initDOM();
const Event              = DOM.Event;
const CustomEvent        = DOM.CustomEvent;

const Promise            = initPromise().Promise;
var HTMLFiles            = initUIEventsFiles();
var docload              = initDocumentLoading(DOM, HTMLFiles);
var document             = docload.loadDocument("EventDispatchOnDisabledElements.html");
var window               = DOM.window;
var self                 = window.clone();
var testharness          = initTestHarness(DOM, Promise, this);


// HTML elements that can be disabled
const formElements = ["button", "fieldset", "input", "select", "textarea"];

testharness.promise_test(async () => {
  // For each form element type, set up transition event handlers.
  for (var localName in formElements) {
    localName = formElements[localName];
    const elem = document.createElement(localName);
    elem.disabled = true;
    document.body.appendChild(elem);
    const eventPromises = [
      "transitionrun",
      "transitionstart",
      "transitionend",
    ].map(eventType => {
      return new Promise(r => {
        elem.addEventListener(eventType, r);
      });
    });
    // Flushing style triggers transition.
    window.getComputedStyle(elem).opacity;
    elem.style.transition = "opacity .1s";
    elem.style.opacity = 0;
    window.getComputedStyle(elem).opacity;
    // All the events fire...
    await Promise.all(eventPromises);
    elem.remove();
  }
}, "CSS Transitions transitionrun, transitionstart, transitionend events fire on disabled form elements");


testharness.promise_test(async () => {
  // For each form element type, set up transition event handlers.
  for (var localName in formElements) {
    localName = formElements[localName];
    const elem = document.createElement(localName);
    elem.disabled = true;
    document.body.appendChild(elem);
    window.getComputedStyle(elem).opacity;
    elem.style.transition = "opacity 100s";
    // We use ontransitionstart to cancel the event.
    elem.ontransitionstart = () => {
      elem.style.display = "none";
    };
    const promiseToCancel = new Promise(r => {
      elem.ontransitioncancel = r;
    });
    // Flushing style triggers the transition.

    elem.style.opacity = 0;
    window.getComputedStyle(elem).opacity;
    await promiseToCancel;
    // And we are done with this element.
    elem.remove();
  }
}, "CSS Transitions transitioncancel event fires on disabled form elements");


testharness.promise_test(async () => {
  // For each form element type, set up transition event handlers.
  for (var localName in formElements) {
    localName = formElements[localName];
    const elem = document.createElement(localName);
    document.body.appendChild(elem);
    elem.disabled = true;
    const animationStartPromise = new Promise(r => {
      elem.addEventListener("animationstart", () => {
        // Seek to the second iteration to trigger the animationiteration event
        elem.style.animationDelay = "-100s"
        r();
      });
    });
    const animationIterationPromise = new Promise(r => {
      elem.addEventListener("animationiteration", ()=>{
        elem.style.animationDelay = "-200s"
        r();
      });
    });
    const animationEndPromise = new Promise(r => {
      elem.addEventListener("animationend", r);
    });
    elem.style.animation = "fade 100s 2";
    elem.classList.add("animate");
    // All the events fire...
    await Promise.all([
      animationStartPromise,
      animationIterationPromise,
      animationEndPromise,
    ]);
    elem.remove();
  }
}, "CSS Animation animationstart, animationiteration, animationend fire on disabled form elements");


testharness.promise_test(async () => {
  // For each form element type, set up transition event handlers.
  for (var localName in formElements) {
    localName = formElements[localName];
    const elem = document.createElement(localName);
    document.body.appendChild(elem);
    elem.disabled = true;

    const promiseToCancel = new Promise(r => {
      elem.addEventListener("animationcancel", r);
    });

    elem.addEventListener("animationstart", () => {
      // Cancel the animation by hiding it.
      elem.style.display = "none";
    });

    // Trigger the animation
    elem.style.animation = "fade 100s";
    elem.classList.add("animate");
    await promiseToCancel;
    // And we are done with this element.
    elem.remove();
  }
}, "CSS Animation's animationcancel event fires on disabled form elements");

testharness.promise_test(async () => {
  for (var localName in formElements) {
    localName = formElements[localName];
    const elem = document.createElement(localName);
    elem.disabled = true;
    document.body.appendChild(elem);
    // Element is disabled, so clicking must not fire events
    let pass = true;
    elem.onclick = e => {
      pass = false;
    };
    // Disabled elements are not clickable.
    await elem.click();
    testharness.assert_true(
      pass,
      `${elem.constructor.name} is disabled, so onclick must not fire.`
    );
    // Element is (re)enabled... so this click() will fire an event.
    pass = false;
    elem.disabled = false;
    elem.onclick = () => {
      pass = true;
    };
    await elem.click();
    testharness.assert_true(
      pass,
      `${elem.constructor.name} is enabled, so onclick must fire.`
    );
    elem.remove();
  }
}, "Real clicks on disabled elements must not dispatch events.");
