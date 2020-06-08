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
var self                 = window;//.clone();
var testharness          = initTestHarness(DOM, Promise, this);
var performance          = new Performance.Performance();
window.document 		 = document;
document.browsingContext = window;


var dump = document.getElementById("dump")


testharness.async_test(function(t) {
  var input = document.createElement("input")
  input.type = "checkbox"
  dump.appendChild(input)
  input.onclick = t.step_func_done(function() {
    testharness.assert_true(input.checked)
  })
  input.click()
}, "basic with click()")


testharness.async_test(function(t) {
  var input = document.createElement("input")
  input.type = "checkbox"
  dump.appendChild(input)
  input.onclick = t.step_func_done(function() {
    testharness.assert_true(input.checked)
  })
  input.dispatchEvent(new MouseEvent.MouseEvent("click", {bubbles:true})) // equivalent to the above
}, "basic with dispatchEvent()")


testharness.async_test(function(t) {
  var input = document.createElement("input")
  input.type = "checkbox"
  dump.appendChild(input)
  input.onclick = t.step_func_done(function() {
    testharness.assert_false(input.checked)
  })
  input.dispatchEvent(new Event.Event("click", {bubbles:true})) // no MouseEvent
}, "basic with wrong event class")


testharness.async_test(function(t) {
  var input = document.createElement("input")
  input.type = "checkbox"
  dump.appendChild(input)
  var child = input.appendChild(new Text.Text("does not matter"))
  child.dispatchEvent(new MouseEvent.MouseEvent("click")) // does not bubble
  testharness.assert_false(input.checked)
  t.done()
}, "look at parents only when event bubbles")


testharness.async_test(function(t) {
  var input = document.createElement("input")
  input.type = "checkbox"
  dump.appendChild(input)
  input.onclick = t.step_func_done(function() {
    testharness.assert_true(input.checked)
  })
  var child = input.appendChild(new Text.Text("does not matter"))
  child.dispatchEvent(new MouseEvent.MouseEvent("click", {bubbles:true}))
}, "look at parents when event bubbles")


testharness.async_test(function(t) {
  var input = document.createElement("input")
  input.type = "checkbox"
  dump.appendChild(input)
  input.onclick = t.step_func(function() {
    testharness.assert_false(input.checked, "input pre-click must not be triggered")
  })
  var child = input.appendChild(document.createElement("input"))
  child.type = "checkbox"
  child.onclick = t.step_func(function() {
    testharness.assert_true(child.checked, "child pre-click must be triggered")
  })
  child.dispatchEvent(new MouseEvent.MouseEvent("click", {bubbles:true}))
  t.done()
}, "pick the first with activation behavior <input type=checkbox>")


testharness.async_test(function(t) { // as above with <a>
  window.hrefComplete = t.step_func(function(a) {
    testharness.assert_equals(a, 'child');
    t.done();
  });
  var link = document.createElement("a")
  link.href = "javascript:hrefComplete('link')" // must not be triggered
  dump.appendChild(link)
  var child = link.appendChild(document.createElement("a"))
  child.href = "javascript:hrefComplete('child')"
  child.dispatchEvent(new MouseEvent.MouseEvent("click", {bubbles:true}))
}, "pick the first with activation behavior <a href>")


testharness.async_test(function(t) {
  var input = document.createElement("input")
  input.type = "checkbox"
  dump.appendChild(input)
  var clickEvent = new MouseEvent.MouseEvent("click")
  input.onchange = t.step_func_done(function() {
    testharness.assert_false(clickEvent.defaultPrevented)
    testharness.assert_true(clickEvent.returnValue)
    testharness.assert_equals(clickEvent.eventPhase, 0)
    testharness.assert_equals(clickEvent.currentTarget, null)
    testharness.assert_equals(clickEvent.target, input)
    testharness.assert_equals(clickEvent.srcElement, input)
    testharness.assert_equals(clickEvent.composedPath().length, 0)
  })
  input.dispatchEvent(clickEvent)
}, "event state during post-click handling")


testharness.async_test(function(t) {
  var input = document.createElement("input")
  input.type = "checkbox"
  dump.appendChild(input)
  var clickEvent = new MouseEvent.MouseEvent("click")
  var finalTarget = document.createElement("doesnotmatter")
  finalTarget.onclick = t.step_func_done(function() {
    testharness.assert_equals(clickEvent.target, finalTarget)
    testharness.assert_equals(clickEvent.srcElement, finalTarget)
  })
  input.onchange = t.step_func(function() {
    finalTarget.dispatchEvent(clickEvent)
  })
  input.dispatchEvent(clickEvent)
}, "redispatch during post-click handling")


testharness.async_test(function(t) {
  var input = document.createElement("input")
  input.type = "checkbox"
  dump.appendChild(input)
  var child = input.appendChild(document.createElement("input"))
  child.type = "checkbox"
  child.disabled = true
  child.click()
  testharness.assert_false(input.checked)
  testharness.assert_false(child.checked)
  t.done()
}, "disabled checkbox still has activation behavior")


testharness.async_test(function(t) {
  var state = "start"

  var form = document.createElement("form")
  form.onsubmit = t.step_func(() => {
    if(state == "start" || state == "checkbox") {
      state = "failure"
    } else if(state == "form") {
      state = "done"
    }
    return false
  })
  dump.appendChild(form)
  var button = form.appendChild(document.createElement("button"))
  button.type = "submit"
  var checkbox = button.appendChild(document.createElement("input"))
  checkbox.type = "checkbox"
  checkbox.onclick = t.step_func(() => {
    if(state == "start") {
      testharness.assert_unreached()
    } else if(state == "checkbox") {
      testharness.assert_true(checkbox.checked)
    }
  })
  checkbox.disabled = true
  checkbox.click()
  testharness.assert_equals(state, "start")

  state = "checkbox"
  checkbox.disabled = false
  checkbox.click()
  testharness.assert_equals(state, "checkbox")

  state = "form"
  button.click()
  testharness.assert_equals(state, "done")

  t.done()
}, "disabled checkbox still has activation behavior, part 2")


testharness.async_test(function(t) {
  var input = document.createElement("input")
  input.type = "checkbox"
  input.onclick = t.step_func_done(function() {
    testharness.assert_true(input.checked)
  })
  input.click()
}, "disconnected checkbox should be checked")


testharness.async_test(function(t) {
  var input = document.createElement("input")
  input.type = "radio"
  input.onclick = t.step_func_done(function() {
    testharness.assert_true(input.checked)
  })
  input.click()
}, "disconnected radio should be checked")


testharness.async_test(function(t) {
  var form = document.createElement("form")
  var didSubmit = false
  form.onsubmit = t.step_func(() => {
    didSubmit = true
    return false
  })
  var input = form.appendChild(document.createElement("input"))
  input.type = "submit"
  input.click()
  testharness.assert_false(didSubmit)
  t.done()
}, "disconnected form should not submit")
