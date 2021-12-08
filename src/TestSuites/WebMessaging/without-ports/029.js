//Title: Check that getters don't linger after deletion wrt cloning</title>

import { MessageChannel } from '../../../js/MessagePassing/WebMessaging/MessageChannel';
import { async_test, assert_equals } from '../../../js/DOM/Events/Testharness';
const Window = require('../../../js/DOM/Events/Window');
var window = Window.getInstance();

async_test(function() {
   var obj = {};
   Object.defineProperty(obj, "a", {
    get: function(){ return 2; },
    set: function(v){ return; },
    enumerable: true,
    configurable: true
   });
   //obj.__defineGetter__( "a", function(){  } );
   //obj.__defineSetter__( "a", function(v){ return; } );
   delete obj.a;
   obj.a = 2;

   window.postMessage(obj, '*');
   window.onmessage = this.step_func(function(e) {
     console.log('Got message, comparing '+e.data.a+' with 2');
     assert_equals(e.data.a, 2);
     this.done();
  });
});

