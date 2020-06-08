const DOM                = initDOM();
const Event              = DOM.Event;
const CustomEvent        = DOM.CustomEvent;

const Promise            = initPromise().Promise;
var HTMLFiles            = initUIEventsFiles();
var docload              = initDocumentLoading(DOM, HTMLFiles);
var document             = docload.loadDocument("EventConstants.html");
var window               = DOM.window;
var self                 = window.clone();
var testharness          = initTestHarness(DOM, Promise, this);

function testConstants(objects, constants, msg) {
  objects.forEach(function(arr) {
    var o = arr[0], desc = arr[1];
    testharness.test(function() {
      constants.forEach(function(d) {
        testharness.assert_true(d[0] in o, "Object " + o + " doesn't have " + d[0])
        testharness.assert_equals(o[d[0]], d[1], "Object " + o + " value for " + d[0] + " is wrong")
      })
    }, "Constants for " + msg + " on " + desc + ".")
  })
}

var objects;
testharness.setup(function() {
  objects = [
    [Event, "Event interface object"],
    [Event.prototype, "Event prototype object"],
    [document.createEvent("Event"), "Event object"],
    [document.createEvent("CustomEvent"), "CustomEvent object"]
  ]
})
testConstants(objects, [
  ["NONE", 0],
  ["CAPTURING_PHASE", 1],
  ["AT_TARGET", 2],
  ["BUBBLING_PHASE", 3]
], "eventPhase")
