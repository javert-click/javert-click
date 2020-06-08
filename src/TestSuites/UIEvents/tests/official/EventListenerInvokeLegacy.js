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
var document             = docload.loadDocument("EventListenerInvokeLegacy.html");
var window               = DOM.window;
var self                 = window.clone();
var testharness          = initTestHarness(DOM, Promise, this);
var performance          = new Performance.Performance();
window.document 		 = document;
document.browsingContext = window;


function runLegacyEventTest(type, legacyType, ctor, setup) {
  function createTestElem(t) {
    var elem = document.createElement('div');
    document.body.appendChild(elem);
    t.add_cleanup(function() {
      document.body.removeChild(elem);
    });
    return elem;
  }

  
testharness.async_test(function(t) {
    var elem = createTestElem(t);
    var gotEvent = false;
    elem.addEventListener(legacyType,
      t.unreached_func("listener of " + legacyType + " should not be invoked"));
    elem.addEventListener(type, t.step_func(function() {
      testharness.assert_false(gotEvent, "unexpected " + type + " event");
      gotEvent = true;
      t.step_timeout(function() { t.done(); }, 100);
    }));
    testharness.setup(elem);
  }, "Listener of " + type);

  
testharness.async_test(function(t) {
    var elem = createTestElem(t);
    var count = 0;
    elem.addEventListener(legacyType, t.step_func(function() {
      ++count;
      if (count > 1) {
        testharness.assert_unreached("listener of " + legacyType + " should not be invoked again");
        return;
      }
      elem.dispatchEvent(new window[ctor](type));
      t.done();
    }));
    testharness.setup(elem);
  }, "Legacy listener of " + type);
}

function setupTransition(elem) {
  getComputedStyle(elem).color;
  elem.style.color = 'green';
  elem.style.transition = 'color 30ms';
}

function setupAnimation(elem) {
  elem.style.animation = 'test 30ms';
}

runLegacyEventTest('transitionend', 'webkitTransitionEnd', "TransitionEvent", setupTransition);
runLegacyEventTest('animationend', 'webkitAnimationEnd', "AnimationEvent", setupAnimation);
runLegacyEventTest('animationstart', 'webkitAnimationStart', "AnimationEvent", setupAnimation);
