import { test, assert_equals, assert_true } from '../../../../../js/DOM/Events/Testharness';

test(function() {
  console.log('Going to check if self === self? '+(self === self));
  assert_equals(self, self);
}, 'self === self');

test(function() {
  console.log('Going to check if self instanceof WorkerGlobalScope? '+(self instanceof WorkerGlobalScope));
  assert_true(self instanceof WorkerGlobalScope);
}, 'self instanceof WorkerGlobalScope');

test(function() {
  console.log('Going to check if self has property "self"?' +('self' in self));
  assert_true('self' in self);
}, '\'self\' in self');

test(function() {
  var x = self;
  self = 1;
  assert_equals(self, x);
}, 'self = 1');