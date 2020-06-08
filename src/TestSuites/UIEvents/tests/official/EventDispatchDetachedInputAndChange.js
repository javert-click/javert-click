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
var document             = docload.loadDocument("EventDispatchBubblesFalse.html");
var window               = DOM.window;
var self                 = window.clone();
var testharness          = initTestHarness(DOM, Promise, this);
var performance          = new Performance.Performance();
window.document 		 = document;
document.browsingContext = window;

testharness.test(() => {
  const input = document.createElement('input');
  input.type = 'checkbox';

  let inputEventFired = false;
  input.addEventListener('input', () => inputEventFired = true);
  let changeEventFired = false;
  input.addEventListener('change', () => changeEventFired = true);
  input.click();
  testharness.assert_false(inputEventFired);
  testharness.assert_false(changeEventFired);
}, 'detached checkbox should not emit input or change events on click().');

testharness.test(() => {
  const input = document.createElement('input');
  input.type = 'radio';

  let inputEventFired = false;
  input.addEventListener('input', () => inputEventFired = true);
  let changeEventFired = false;
  input.addEventListener('change', () => changeEventFired = true);
  input.click();
  testharness.assert_false(inputEventFired);
  testharness.assert_false(changeEventFired);
}, 'detached radio should not emit input or change events on click().');

testharness.test(() => {
  const input = document.createElement('input');
  input.type = 'checkbox';

  let inputEventFired = false;
  input.addEventListener('input', () => inputEventFired = true);
  let changeEventFired = false;
  input.addEventListener('change', () => changeEventFired = true);
  input.dispatchEvent(new MouseEvent.MouseEvent('click'));
  testharness.assert_false(inputEventFired);
  testharness.assert_false(changeEventFired);
}, `detached checkbox should not emit input or change events on dispatchEvent(new MouseEvent('click')).`);

testharness.test(() => {
  const input = document.createElement('input');
  input.type = 'radio';

  let inputEventFired = false;
  input.addEventListener('input', () => inputEventFired = true);
  let changeEventFired = false;
  input.addEventListener('change', () => changeEventFired = true);
  input.dispatchEvent(new MouseEvent.MouseEvent('click'));

  testharness.assert_false(inputEventFired);
  testharness.assert_false(changeEventFired);
}, `detached radio should not emit input or change events on dispatchEvent(new MouseEvent('click')).`);

testharness.test(() => {
  const input = document.createElement('input');
  input.type = 'checkbox';
  document.body.appendChild(input);

  let inputEventFired = false;
  input.addEventListener('input', () => inputEventFired = true);
  let changeEventFired = false;
  input.addEventListener('change', () => changeEventFired = true);
  input.click();
  testharness.assert_true(inputEventFired);
  testharness.assert_true(changeEventFired);
}, 'attached checkbox should emit input and change events on click().');

testharness.test(() => {
  const input = document.createElement('input');
  input.type = 'radio';
  document.body.appendChild(input);

  let inputEventFired = false;
  input.addEventListener('input', () => inputEventFired = true);
  let changeEventFired = false;
  input.addEventListener('change', () => changeEventFired = true);
  input.click();
  testharness.assert_true(inputEventFired);
  testharness.assert_true(changeEventFired);
}, 'attached radio should emit input and change events on click().');

testharness.test(() => {
  const input = document.createElement('input');
  input.type = 'checkbox';
  document.body.appendChild(input);

  let inputEventFired = false;
  input.addEventListener('input', () => inputEventFired = true);
  let changeEventFired = false;
  input.addEventListener('change', () => changeEventFired = true);
  input.dispatchEvent(new MouseEvent.MouseEvent('click'));
  testharness.assert_true(inputEventFired);
  testharness.assert_true(changeEventFired);
}, `attached checkbox should emit input and change events on dispatchEvent(new MouseEvent('click')).`);

testharness.test(() => {
  const input = document.createElement('input');
  input.type = 'radio';
  document.body.appendChild(input);

  let inputEventFired = false;
  input.addEventListener('input', () => inputEventFired = true);
  let changeEventFired = false;
  input.addEventListener('change', () => changeEventFired = true);
  input.dispatchEvent(new MouseEvent.MouseEvent('click'));
  testharness.assert_true(inputEventFired);
  testharness.assert_true(changeEventFired);
}, `attached radio should emit input and change events on dispatchEvent(new MouseEvent('click')).`);

testharness.test(() => {
  const input = document.createElement('input');
  input.type = 'checkbox';
  const shadowHost = document.createElement('div');
  document.body.appendChild(shadowHost);
  const shadowRoot = shadowHost.attachShadow({mode: 'open'});
  shadowRoot.appendChild(input);

  let inputEventFired = false;
  input.addEventListener('input', () => inputEventFired = true);
  let changeEventFired = false;
  input.addEventListener('change', () => changeEventFired = true);
  input.click();
  testharness.assert_true(inputEventFired);
  testharness.assert_true(changeEventFired);
}, 'attached to shadow dom checkbox should emit input and change events on click().');

testharness.test(() => {
  const input = document.createElement('input');
  input.type = 'radio';
  const shadowHost = document.createElement('div');
  document.body.appendChild(shadowHost);
  const shadowRoot = shadowHost.attachShadow({mode: 'open'});
  shadowRoot.appendChild(input);

  let inputEventFired = false;
  input.addEventListener('input', () => inputEventFired = true);
  let changeEventFired = false;
  input.addEventListener('change', () => changeEventFired = true);
  input.click();
  testharness.assert_true(inputEventFired);
  testharness.assert_true(changeEventFired);
}, 'attached to shadow dom radio should emit input and change events on click().');

testharness.test(() => {
  const input = document.createElement('input');
  input.type = 'checkbox';
  const shadowHost = document.createElement('div');
  document.body.appendChild(shadowHost);
  const shadowRoot = shadowHost.attachShadow({mode: 'open'});
  shadowRoot.appendChild(input);

  let inputEventFired = false;
  input.addEventListener('input', () => inputEventFired = true);
  let changeEventFired = false;
  input.addEventListener('change', () => changeEventFired = true);
  input.dispatchEvent(new MouseEvent.MouseEvent('click'));
  testharness.assert_true(inputEventFired);
  testharness.assert_true(changeEventFired);
}, `attached to shadow dom checkbox should emit input and change events on dispatchEvent(new MouseEvent('click')).`);

testharness.test(() => {
  const input = document.createElement('input');
  input.type = 'radio';
  const shadowHost = document.createElement('div');
  document.body.appendChild(shadowHost);
  const shadowRoot = shadowHost.attachShadow({mode: 'open'});
  shadowRoot.appendChild(input);

  let inputEventFired = false;
  input.addEventListener('input', () => inputEventFired = true);
  let changeEventFired = false;
  input.addEventListener('change', () => changeEventFired = true);
  input.dispatchEvent(new MouseEvent.MouseEvent('click'));
  testharness.assert_true(inputEventFired);
  testharness.assert_true(changeEventFired);
}, `attached to shadow dom radio should emit input and change events on dispatchEvent(new MouseEvent('click')).`);
