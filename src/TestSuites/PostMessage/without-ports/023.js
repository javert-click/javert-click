// Title: Object cloning: own properties only, don't follow prototype

import { MessageChannel } from '../../../js/MessagePassing/PostMessage/MessageChannel';
import { async_test, assert_not_equals } from '../../../js/DOM/Events/Testharness';
const Window = require('../../../js/DOM/Events/Window');
var window = Window.getInstance();

/*
* @id test032Parent
*/
var Parent = function(){
  this.c = "xyz";
};

/*
* @id test032Child
*/
var Child = function(a, b) {
  this.a = a;
  this.b = b;
};
//Child.prototype = new Parent;

async_test(function() {
  var obj = new Child(1, 2);
  var props = Object.getOwnPropertyNames(obj);
  console.log('Obj has '+props.length+' properties!');
  var ch = new MessageChannel();
  ch.port1.onmessage = this.step_func(function(e) {
    console.log('Got message!');
    for (var i in e.data.obj){
      console.log('Got property '+i);
      assert_not_equals(i, 'c');
    }
    this.done();
   });
  ch.port2.start();
  ch.port2.postMessage({obj: obj});
});
