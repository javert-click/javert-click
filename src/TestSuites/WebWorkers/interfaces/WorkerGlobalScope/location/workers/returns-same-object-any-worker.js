import { test, assert_equals } from '../../../../../../js/DOM/Events/Testharness';
const location = require('../../../../../../js/MessagePassing/PostMessage/Location');

test(function() {
    assert_equals(location, location);
}, 'location === location');