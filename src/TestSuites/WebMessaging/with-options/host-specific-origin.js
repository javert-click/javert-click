import { MessageChannel } from '../../../js/MessagePassing/PostMessage/MessageChannel';
import { assert_equals, async_test } from '../../../js/DOM/Events/Testharness';
const location = require('../../../js/MessagePassing/PostMessage/Location');
const Window = require('../../../js/DOM/Events/Window');
var window = Window.getInstance();

async_test(function() {
    window.postMessage('', {targetOrigin: location.protocol + '//' + location.host + '//'});
    window.onmessage = this.step_func(function(e) {
      assert_equals(e.origin, location.protocol + '//' + location.host);
      this.done();
    });
});