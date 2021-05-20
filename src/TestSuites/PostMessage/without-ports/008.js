//Title: just one argument

import { MessageChannel } from '../../../js/MessagePassing/PostMessage/MessageChannel';
import { test } from '../../../js/DOM/Events/Testharness';
const Window = require('../../../js/DOM/Events/Window');
var window = Window.getInstance();

test(function() {
  window.postMessage('');
  console.log('Finished test');
  this.done();
 });

 // Question: why this should throw type error? I don't understand
