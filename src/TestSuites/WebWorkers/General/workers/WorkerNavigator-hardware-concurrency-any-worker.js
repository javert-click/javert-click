// META: global=worker
import { test, assert_true } from '../../../../js/DOM/Events/Testharness';

test(() => {
    assert_true(navigator.hardwareConcurrency > 0);
}, 'Test worker navigator hardware concurrency.');