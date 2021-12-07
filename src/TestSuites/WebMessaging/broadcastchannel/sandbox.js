import { async_test, assert_equals } from '../../../js/DOM/Events/Testharness';

const HTMLDocument = require('../../../js/DOM/Events/HTMLDocument');
const Window = require('../../../js/DOM/Events/Window');

var window = Window.getInstance();
var self = window;

var document = new HTMLDocument.HTMLDocument();
var iframe = document.createElement('iframe');
document.appendChild(iframe);
iframe.src = "sandboxed.js";

async_test(t => {
  self.onmessage = t.step_func(e => {
    assert_equals(e.data, 'Created');
    t.done();
    });
});