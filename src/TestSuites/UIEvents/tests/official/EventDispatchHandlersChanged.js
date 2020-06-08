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

testharness.
test(function() {
  var event_type = "bar";
  var target = document.getElementById("target");
  var parent = document.getElementById("parent");
  var tbody = document.getElementById("table-body");
  var table = document.getElementById("table");
  var body = document.body;
  var html = document.documentElement;
  var targets = [window, document, html, body, table, tbody, parent, target];
  var expected_targets = [
    window,
    document,
    html,
    body,
    table,
    tbody,
    parent,
    target,
    target,
    target, // The additional listener for target runs as we copy its listeners twice
    parent,
    tbody,
    table,
    body,
    html,
    document,
    window
  ];
  var expected_listeners = [0,0,0,0,0,0,0,0,1,3,1,1,1,1,1,1,1];

  var actual_targets = [], actual_listeners = [];
  var test_event_function = function(i) {
    return this.step_func(function(evt) {
      actual_targets.push(evt.currentTarget);
      actual_listeners.push(i);

      if (evt.eventPhase != evt.BUBBLING_PHASE && evt.currentTarget.foo != 1) {
        evt.currentTarget.removeEventListener(event_type, event_handlers[0], true);
        evt.currentTarget.addEventListener(event_type, event_handlers[2], true);
        evt.currentTarget.foo = 1;
      }

      if (evt.eventPhase != evt.CAPTURING_PHASE && evt.currentTarget.foo != 3) {
        evt.currentTarget.removeEventListener(event_type, event_handlers[0], false);
        evt.currentTarget.addEventListener(event_type, event_handlers[3], false);
        evt.currentTarget.foo = 3;
      }
    });
  }.bind(this);
  var event_handlers = [
    test_event_function(0),
    test_event_function(1),
    test_event_function(2),
    test_event_function(3),
  ];

  for (var i = 0; i < targets.length; ++i) {
    targets[i].addEventListener(event_type, event_handlers[0], true);
    targets[i].addEventListener(event_type, event_handlers[1], false);
  }

  var evt = document.createEvent("Event");
  evt.initEvent(event_type, true, true);
  target.dispatchEvent(evt);

  testharness.assert_array_equals(actual_targets, expected_targets, "actual_targets");
  testharness.assert_array_equals(actual_listeners, expected_listeners, "actual_listeners");
});
