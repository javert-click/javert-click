import { test, assert_true, assert_equals, done } from '../../../../js/DOM/Events/Testharness';

test(() => {
  assert_true(self.hasOwnProperty("name"), "property exists on the global");
  assert_equals(self.name, "my name");
}, `name property value for ${self.constructor.name}`);

test(() => {
  self.name = "something new";
  const propDesc = Object.getOwnPropertyDescriptor(self, "name");
  assert_equals(propDesc.value, "something new", "value");
  assert_true(propDesc.configurable, "configurable");
  assert_true(propDesc.writable, "writable");
  assert_true(propDesc.enumerable, "enumerable");
}, `name property is replaceable for ${self.constructor.name}`);

done();