import { test, assert_equals, done } from '../../../../../js/DOM/Events/Testharness';
import { result } from "../support/gammascript.js";
test(() => {
  console.log('Worker: Going to call assert');
  assert_equals(result, "gamma/script.js");
});
done();