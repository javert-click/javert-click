import { test, assert_equals, assert_true } from '../../../js/DOM/Events/Testharness';

test(() => {
    assert_equals(typeof navigator, "object");
    assert_true(navigator instanceof WorkerNavigator);
    assert_equals(navigator.appName, "Netscape");
    assert_true(navigator.appVersion.indexOf('WebKit') != 0);
    assert_equals(typeof navigator.platform, "string");
    assert_true(navigator.userAgent.indexOf('WebKit') != 0);
    assert_equals(typeof navigator.onLine, "boolean");
    assert_equals(navigator.appCodeName, 'Mozilla');
    assert_equals(navigator.product, 'Gecko');
}, "Testing Navigator properties on workers.");