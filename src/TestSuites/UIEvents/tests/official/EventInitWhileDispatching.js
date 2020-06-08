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
var document             = docload.loadDocument("EventInitWhileDispatching.html");
var window               = DOM.window;
var self                 = window.clone();
var testharness          = initTestHarness(DOM, Promise, this);
var performance          = new Performance.Performance();
window.document 		 = document;
document.browsingContext = window;


var events = {
  'KeyboardEvent': {
    'constructor': function() { return new KeyboardEvent.KeyboardEvent("type", {key: "A"}); },
    'init': function(ev) { ev.initKeyboardEvent("type2", true, true, null, "a", 1, "", true, "") },
    'check': function(ev) {
       testharness.assert_equals(ev.key, "A", "initKeyboardEvent key setter should short-circuit");
       testharness.assert_false(ev.repeat, "initKeyboardEvent repeat setter should short-circuit");
       testharness.assert_equals(ev.location, 0, "initKeyboardEvent location setter should short-circuit");
     }
  },
  'MouseEvent': {
    'constructor': function() { return new MouseEvent.MouseEvent("type"); },
    'init': function(ev) { ev.initMouseEvent("type2", true, true, null, 0, 1, 1, 1, 1, true, true, true, true, 1, null) },
    'check': function(ev) {
      testharness.assert_equals(ev.screenX, 0, "initMouseEvent screenX setter should short-circuit");
      testharness.assert_equals(ev.screenY, 0, "initMouseEvent screenY setter should short-circuit");
      testharness.assert_equals(ev.clientX, 0, "initMouseEvent clientX setter should short-circuit");
      testharness.assert_equals(ev.clientY, 0, "initMouseEvent clientY setter should short-circuit");
      testharness.assert_false(ev.ctrlKey, "initMouseEvent ctrlKey setter should short-circuit");
      testharness.assert_false(ev.altKey, "initMouseEvent altKey setter should short-circuit");
      testharness.assert_false(ev.shiftKey, "initMouseEvent shiftKey setter should short-circuit");
      testharness.assert_false(ev.metaKey, "initMouseEvent metaKey setter should short-circuit");
      testharness.assert_equals(ev.button, 0, "initMouseEvent button setter should short-circuit");
    }
  },
  'CustomEvent': {
    'constructor': function() { return new CustomEvent.CustomEvent("type") },
    'init': function(ev) { ev.initCustomEvent("type2", true, true, 1) },
    'check': function(ev) {
      testharness.assert_equals(ev.detail, null, "initCustomEvent detail setter should short-circuit");
    }
  },
  'UIEvent': {
    'constructor': function() { return new UIEvent.UIEvent("type") },
    'init': function(ev) { ev.initUIEvent("type2", true, true, window, 1) },
    'check': function(ev) {
      testharness.assert_equals(ev.view, null, "initUIEvent view setter should short-circuit");
      testharness.assert_equals(ev.detail, 0, "initUIEvent detail setter should short-circuit");
    }
  },
  'Event': {
    'constructor': function() { return new Event.Event("type") },
    'init': function(ev) { ev.initEvent("type2", true, true) },
    'check': function(ev) {
      testharness.assert_equals(ev.bubbles, false, "initEvent bubbles setter should short-circuit");
      testharness.assert_equals(ev.cancelable, false, "initEvent cancelable setter should short-circuit");
      testharness.assert_equals(ev.type, "type", "initEvent type setter should short-circuit");
    }
  }
};

var names = Object.keys(events);
for (var i = 0; i < names.length; i++) {
  var t = 
testharness.async_test("Calling init" + names[i] + " while dispatching.");
  t.step(function() {
    var e = events[names[i]].constructor();

    var target = document.createElement("div")
    target.addEventListener("type", t.step_func(function() {
      events[names[i]].init(e);

      var o = e;
      while ((o = Object.getPrototypeOf(o))) {
        if (!(o.constructor.name in events)) {
          break;
        }
        events[o.constructor.name].check(e);
      }
    }), false);

    testharness.assert_equals(target.dispatchEvent(e), true, "dispatchEvent must return true")
  });
  t.done();
}
