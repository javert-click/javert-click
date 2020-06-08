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
var document             = docload.loadDocument("EventSubclassesConstructors.html");
var window               = DOM.window;
var self                 = window.clone();
var testharness          = initTestHarness(DOM, Promise, this);
var performance          = new Performance.Performance();
window.document 		     = document;
document.browsingContext = window;


function assert_props(iface, event, defaults) {
  testharness.assert_true(event instanceof self[iface]);
  expected[iface].properties.forEach(function(p) {
    var property = p[0], value = p[defaults ? 1 : 2];
    testharness.assert_true(property in event,
                "Event " + testharness.format_value(event) + " should have a " +
                property + " property");
    testharness.assert_equals(event[property], value,
                  "The value of the " + property + " property should be " +
                  testharness.format_value(value));
  });
  if ("parent" in expected[iface]) {
    assert_props(expected[iface].parent, event, defaults);
  }
}

// Class declarations don't go on the global by default, so put it there ourselves:

self.SubclassedEvent = function SubclassedEvent (name, props) { 
  Event.Event.call(this, name, props); 
  if (props && typeof(props) == "object" && "customProp" in props) {
    this.customProp = props.customProp;
  } else {
    this.customProp = 5;
  }
}

self.SubclassedEvent.prototype = Object.create(Event.Event.prototype);
self.SubclassedEvent.constructor = self.SubclassedEvent;

Object.defineProperty(self.SubclassedEvent.prototype, "fixedProp", { "get": function () { return 17 }});  

/*
self.SubclassedEvent = class SubclassedEvent extends Event.Event {
  constructor(name, props) {
    super(name, props);
    if (props && typeof(props) == "object" && "customProp" in props) {
      this.customProp = props.customProp;
    } else {
      this.customProp = 5;
    }
  }

  get fixedProp() {
    return 17;
  }
}
*/

var EventModifierInit = [
  ["ctrlKey", false, true],
  ["shiftKey", false, true],
  ["altKey", false, true],
  ["metaKey", false, true],
];

var expected = {
  "Event": {
    "properties": [
      ["bubbles", false, true],
      ["cancelable", false, true],
      ["isTrusted", false, false],
    ],
  },

  "UIEvent": {
    "parent": "Event",
    "properties": [
      ["view", null, window],
      ["detail", 0, 7],
    ],
  },

  "FocusEvent": {
    "parent": "UIEvent",
    "properties": [
      ["relatedTarget", null, document],
    ],
  },

  "MouseEvent": {
    "parent": "UIEvent",
    "properties": EventModifierInit.concat([
      ["screenX", 0, 40],
      ["screenY", 0, 40],
      ["clientX", 0, 40],
      ["clientY", 0, 40],
      ["button", 0, 40],
      ["buttons", 0, 40],
      ["relatedTarget", null, document],
    ]),
  },

  "WheelEvent": {
    "parent": "MouseEvent",
    "properties": [
      ["deltaX", 0.0, 3.1],
      ["deltaY", 0.0, 3.1],
      ["deltaZ", 0.0, 3.1],
      ["deltaMode", 0, 40],
    ],
  },

  "KeyboardEvent": {
    "parent": "UIEvent",
    "properties": EventModifierInit.concat([
      ["key", "", "string"],
      ["code", "", "string"],
      ["location", 0, 7],
      ["repeat", false, true],
      ["isComposing", false, true],
      ["charCode", 0, 7],
      ["keyCode", 0, 7],
      ["which", 0, 7],
    ]),
  },

  "CompositionEvent": {
    "parent": "UIEvent",
    "properties": [
      ["data", "", "string"],
    ],
  },

  "SubclassedEvent": {
    "parent": "Event",
    "properties": [
      ["customProp", 5, 8],
      ["fixedProp", 17, 17],
    ],
  },
};

const iter = Object.keys(expected);

for (var i = 0; i < iter.length; i++) {
  var iface = iter[i];

  testharness.test(function() {
    var event = new self[iface]("type");
    assert_props(iface, event, true);
  }, iface + " constructor (no argument)");

 
  testharness.test(function() {
    var event = new self[iface]("type", undefined);
    assert_props(iface, event, true);
  }, iface + " constructor (undefined argument)");

 
  testharness.test(function() {
    var event = new self[iface]("type", null);
    assert_props(iface, event, true);
  }, iface + " constructor (null argument)");

 
  testharness.test(function() {
    var event = new self[iface]("type", {});
    assert_props(iface, event, true);
  }, iface + " constructor (empty argument)");

 
  testharness.test(function() {
    var dictionary = {};
    expected[iface].properties.forEach(function(p) {
      var property = p[0], value = p[1];
      dictionary[property] = value;
    });
    var event = new self[iface]("type", dictionary);
    assert_props(iface, event, true);
  }, iface + " constructor (argument with default values)");

 
  testharness.test(function() {
    function fill_in(iface, dictionary) {
      if ("parent" in expected[iface]) {
        fill_in(expected[iface].parent, dictionary)
      }
      expected[iface].properties.forEach(function(p) {
        var property = p[0], value = p[2];
        dictionary[property] = value;
      });
    }

    var dictionary = {};
    fill_in(iface, dictionary);

    var event = new self[iface]("type", dictionary);
    assert_props(iface, event, false);
  }, iface + " constructor (argument with non-default values)");

};

testharness.
test(function () {
  testharness.assert_throws(new TypeError(), function() {
    new UIEvent.UIEvent("x", { view: 7 })
  });
}, "UIEvent constructor (view argument with wrong type)")
