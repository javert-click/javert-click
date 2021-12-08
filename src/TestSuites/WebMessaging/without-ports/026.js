// Title: Cloning objects with getter properties

import { MessageChannel } from '../../../js/MessagePassing/WebMessaging/MessageChannel';
import { async_test, assert_throws_exactly } from '../../../js/DOM/Events/Testharness';
const Window = require('../../../js/DOM/Events/Window');
var window = Window.getInstance();

async_test(function() {
   var obj = {};
   console.log('running test');
   var err = new Error("getter_should_propagate_exceptions");
   
   Object.defineProperty(obj, "field", {
     /*
     * @id fieldgetter
     */
     get: function(){
      throw err;
     },
     enumerable: true
   });
   //console.log('created getter '+obj.field);
   console.log('going to call assert_throws_exactly');

   assert_throws_exactly(err, function() {
     window.postMessage(obj, '*');
  });
  console.log('TEST PASSED');
  this.done();
});
