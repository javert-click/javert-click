import { test, assert_equals } from '../../../../js/DOM/Events/Testharness';

// META: global=worker
test(() => {
  assert_equals(typeof atob, 'function');
  assert_equals(typeof btoa, 'function');
}, 'Tests that atob() / btoa() functions are exposed to workers');