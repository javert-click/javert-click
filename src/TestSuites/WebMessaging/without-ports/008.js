//Title: just one argument

import { MessageChannel } from '../../../js/MessagePassing/WebMessaging/MessageChannel';
import { test } from '../../../js/DOM/Events/Testharness';
const Window = require('../../../js/DOM/Events/Window');
var window = Window.getInstance();

test(function() {
  window.postMessage('');
  console.log('Finished test');
  this.done();
 });
 //TODOMP: What is the purpose of this test?