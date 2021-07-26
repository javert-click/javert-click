import { test, assert_equals, done } from '../../../../../js/DOM/Events/Testharness';

test(function() {
    var rv = postMessage(1);
    assert_equals(rv, undefined);
}, "return value of postMessage");
  
done();