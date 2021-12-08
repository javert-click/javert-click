import { test, assert_equals } from '../../../../../../js/DOM/Events/Testharness';
const location = require('../../../../../../js/MessagePassing/WebMessaging/Location');

test(function() {
    assert_equals(location, location);
}, 'location === location');