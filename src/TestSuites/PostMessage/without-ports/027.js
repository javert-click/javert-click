// Title: Cloning objects, preserving sharing

import { MessageChannel } from '../../../js/MessagePassing/PostMessage/MessageChannel';
import { async_test, assert_equals } from '../../../js/DOM/Events/Testharness';
const Window = require('../../../js/DOM/Events/Window');
var window = Window.getInstance();

async_test(function() {
  var obj1 = {o: 1};
  var obj2 = {d: obj1};
  var obj3 = {d: obj1};
  var obj_dag = {b: obj2, c: obj3};

  window.postMessage(obj_dag, '*');
  window.onmessage = this.step_func(function(e) {
    console.log('Going to assert that '+e.data.b.d+' is equal to '+e.data.c.d);
    assert_equals(e.data.b.d, e.data.c.d);
    this.done();
  });
});
