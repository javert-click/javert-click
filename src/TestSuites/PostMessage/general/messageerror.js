
//Title: onmessageerror content attribute
import { MessageChannel } from '../../../js/MessagePassing/PostMessage/MessageChannel';
import { test, assert_equals, assert_true  } from '../../../js/DOM/Events/Testharness';

const HTMLDocument = require('../../../js/DOM/Events/HTMLDocument');
const HTMLElement  = require('../../../js/DOM/Events/HTMLElement');
const Window = require('../../../js/DOM/Events/Window');
const Event = require('../../../js/DOM/Events/Event');

var window = Window.getInstance();
var document = new HTMLDocument.HTMLDocument();
window.document = document;
document.window = window;
var elem = new HTMLElement.HTMLElement("div");
document.appendChild(elem);
document.body = elem;

window.messageErrorHappened = false;

function cleanup() {
  window.messageErrorHappened = false;
  document.body.removeAttribute("onmessageerror");
}

test(() => {
  assert_equals(document.body.onmessageerror, null, "body");
  assert_equals(window.onmessageerror, null, "window");
}, "The default value of onmessageerror is null");

test(t => {
  t.add_cleanup(cleanup);
  console.log('added cleanup');

  document.body.setAttribute("onmessageerror", "window.messageErrorHappened = true;");
  console.log('attr is set');
  const compiledHandler = document.body.onmessageerror;
  console.log('got compiledHandler, '+compiledHandler);

  assert_equals(typeof compiledHandler, "function", "The onmessageerror property must be a function");
  compiledHandler();
  assert_true(window.messageErrorHappened, "Calling the handler must run the code");
}, "The onmessageerror content attribute must be compiled into the onmessageerror property");


test(t => {
  t.add_cleanup(cleanup);

  document.body.setAttribute("onmessageerror", "window.messageErrorHappened = true;")

  window.dispatchEvent(new Event.Event("messageerror"));

  assert_true(window.messageErrorHappened, "Dispatching the event must run the code");
}, "The onmessageerror content attribute must execute when an event is dispatched on the window");