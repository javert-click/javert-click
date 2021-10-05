import { test, assert_equals, done } from '../../../../js/DOM/Events/Testharness';

console.log('Running worker script')

// Test body.
test(() => {
    assert_equals(1, 1, "1 == 1");
  },
  "Test that should pass"
);

// ============================================================================

// `done()` is always needed at the bottom for dedicated workers and shared
// workers, even if you write `async_test()` or `promise_test()`.
// `async_test()` and `promise_test()` called before this `done()`
// will continue and assertions/failures after this `done()` are not ignored.
// See
// https://web-platform-tests.org/writing-tests/testharness-api.html#determining-when-all-tests-are-complete
// for details.
done();