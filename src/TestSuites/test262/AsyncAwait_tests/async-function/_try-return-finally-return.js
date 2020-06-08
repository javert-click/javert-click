'use strict';

globalThis.Promise = initPromise().Promise;

function Test262Error(message) {
    this.message = message || "";
}

Test262Error.prototype.toString = function() {
    return "Test262Error: " + this.message;
};

var $ERROR;
$ERROR = function $ERROR(message) {
    throw new Test262Error(message);
};

function $DONOTEVALUATE() {
    throw "Test262: This statement should not be evaluated.";
}

function assert(mustBeTrue, message) {
    if (mustBeTrue === true) {
        return;
    }

    if (message === undefined) {
        message = 'Expected true but got ' + assert._toString(mustBeTrue);
    }
    $ERROR(message);
}

assert._isSameValue = function(a, b) {
    if (a === b) {
        // Handle +/-0 vs. -/+0
        return a !== 0 || 1 / a === 1 / b;
    }

    // Handle NaN vs. NaN
    return a !== a && b !== b;
};

assert.sameValue = function(actual, expected, message) {
    try {
        if (assert._isSameValue(actual, expected)) {
            return;
        }
    } catch (_error) {
        $ERROR(message + ' (_isSameValue operation threw) ' + _error);
        return;
    }

    if (message === undefined) {
        message = '';
    } else {
        message += ' ';
    }

    message += 'Expected SameValue(<' + assert._toString(actual) + '>, <' + assert._toString(expected) + '>) to be true';

    $ERROR(message);
};

assert.notSameValue = function(actual, unexpected, message) {
    if (!assert._isSameValue(actual, unexpected)) {
        return;
    }

    if (message === undefined) {
        message = '';
    } else {
        message += ' ';
    }

    message += 'Expected SameValue(<' + assert._toString(actual) + '>, <' + assert._toString(unexpected) + '>) to be false';

    $ERROR(message);
};

assert.throws = function(expectedErrorConstructor, func, message) {
    if (typeof func !== "function") {
        $ERROR('assert.throws requires two arguments: the error constructor ' +
            'and a function to run');
        return;
    }
    if (message === undefined) {
        message = '';
    } else {
        message += ' ';
    }

    try {
        func();
    } catch (thrown) {
        if (typeof thrown !== 'object' || thrown === null) {
            message += 'Thrown value was not an object!';
            $ERROR(message);
        } else if (thrown.constructor !== expectedErrorConstructor) {
            message += 'Expected a ' + expectedErrorConstructor.name + ' but got a ' + thrown.constructor.name;
            $ERROR(message);
        }
        return;
    }

    message += 'Expected a ' + expectedErrorConstructor.name + ' to be thrown but no exception was thrown at all';
    $ERROR(message);
};

assert._toString = function(value) {
    try {
        return String(value);
    } catch (err) {
        if (err.name === 'TypeError') {
            return Object.prototype.toString.call(value);
        }

        throw err;
    }
};

function __consolePrintHandle__(msg) {
    console.log(msg);
}

function $DONE(_error) {
    if (_error) {
        if (typeof _error === 'object' && _error !== null && 'name' in _error) {
            __consolePrintHandle__('Test262:AsyncTestFailure:' + _error.name + ': ' + _error.message);
        } else {
            __consolePrintHandle__('Test262:AsyncTestFailure:Test262Error: ' + _error);
        }
    } else {
        __consolePrintHandle__('Test262:AsyncTestComplete');
    }
}

function verifyProperty(obj, name, desc, options) {
    assert(
        arguments.length > 2,
        'verifyProperty should receive at least 3 arguments: obj, name, and descriptor'
    );

    var originalDesc = Object.getOwnPropertyDescriptor(obj, name);
    var nameStr = String(name);

    // Allows checking for undefined descriptor if it's explicitly given.
    if (desc === undefined) {
        assert.sameValue(
            originalDesc,
            undefined,
            "obj['" + nameStr + "'] descriptor should be undefined"
        );

        // desc and originalDesc are both undefined, problem solved;
        return true;
    }

    assert(
        Object.prototype.hasOwnProperty.call(obj, name),
        "obj should have an own property " + nameStr
    );

    assert.notSameValue(
        desc,
        null,
        "The desc argument should be an object or undefined, null"
    );

    assert.sameValue(
        typeof desc,
        "object",
        "The desc argument should be an object or undefined, " + String(desc)
    );

    var failures = [];

    if (Object.prototype.hasOwnProperty.call(desc, 'value')) {
        if (!isSameValue(desc.value, originalDesc.value)) {
            failures.push("descriptor value should be " + desc.value);
        }
    }

    if (Object.prototype.hasOwnProperty.call(desc, 'enumerable')) {
        if (desc.enumerable !== originalDesc.enumerable ||
            desc.enumerable !== isEnumerable(obj, name)) {
            failures.push('descriptor should ' + (desc.enumerable ? '' : 'not ') + 'be enumerable');
        }
    }

    if (Object.prototype.hasOwnProperty.call(desc, 'writable')) {
        if (desc.writable !== originalDesc.writable ||
            desc.writable !== isWritable(obj, name)) {
            failures.push('descriptor should ' + (desc.writable ? '' : 'not ') + 'be writable');
        }
    }

    if (Object.prototype.hasOwnProperty.call(desc, 'configurable')) {
        if (desc.configurable !== originalDesc.configurable ||
            desc.configurable !== isConfigurable(obj, name)) {
            failures.push('descriptor should ' + (desc.configurable ? '' : 'not ') + 'be configurable');
        }
    }

    assert(!failures.length, failures.join('; '));

    if (options && options.restore) {
        Object.defineProperty(obj, name, originalDesc);
    }

    return true;
}

function isConfigurable(obj, name) {
    var hasOwnProperty = Object.prototype.hasOwnProperty;
    try {
        delete obj[name];
    } catch (e) {
        if (!(e instanceof TypeError)) {
            $ERROR("Expected TypeError, got " + e);
        }
    }
    return !hasOwnProperty.call(obj, name);
}

function isEnumerable(obj, name) {
    var stringCheck = false;

    if (typeof name === "string") {
        for (var x in obj) {
            if (x === name) {
                stringCheck = true;
                break;
            }
        }
    } else {
        // skip it if name is not string, works for Symbol names.
        stringCheck = true;
    }

    return stringCheck &&
        Object.prototype.hasOwnProperty.call(obj, name) &&
        Object.prototype.propertyIsEnumerable.call(obj, name);
}

function isSameValue(a, b) {
    if (a === 0 && b === 0) return 1 / a === 1 / b;
    if (a !== a && b !== b) return true;

    return a === b;
}

function isWritable(obj, name, verifyProp, value) {
    var newValue = value || "unlikelyValue";
    var hadValue = Object.prototype.hasOwnProperty.call(obj, name);
    var oldValue = obj[name];
    var writeSucceeded;

    try {
        obj[name] = newValue;
    } catch (e) {
        if (!(e instanceof TypeError)) {
            $ERROR("Expected TypeError, got " + e);
        }
    }

    writeSucceeded = isSameValue(obj[verifyProp || name], newValue);

    // Revert the change only if it was successful (in other cases, reverting
    // is unnecessary and may trigger exceptions for certain property
    // configurations)
    if (writeSucceeded) {
        if (hadValue) {
            obj[name] = oldValue;
        } else {
            delete obj[name];
        }
    }

    return writeSucceeded;
}

function verifyEqualTo(obj, name, value) {
    if (!isSameValue(obj[name], value)) {
        $ERROR("Expected obj[" + String(name) + "] to equal " + value +
            ", actually " + obj[name]);
    }
}

function verifyWritable(obj, name, verifyProp, value) {
    if (!verifyProp) {
        assert(Object.getOwnPropertyDescriptor(obj, name).writable,
            "Expected obj[" + String(name) + "] to have writable:true.");
    }
    if (!isWritable(obj, name, verifyProp, value)) {
        $ERROR("Expected obj[" + String(name) + "] to be writable, but was not.");
    }
}

function verifyNotWritable(obj, name, verifyProp, value) {
    if (!verifyProp) {
        assert(!Object.getOwnPropertyDescriptor(obj, name).writable,
            "Expected obj[" + String(name) + "] to have writable:false.");
    }
    if (isWritable(obj, name, verifyProp)) {
        $ERROR("Expected obj[" + String(name) + "] NOT to be writable, but was.");
    }
}

function verifyEnumerable(obj, name) {
    assert(Object.getOwnPropertyDescriptor(obj, name).enumerable,
        "Expected obj[" + String(name) + "] to have enumerable:true.");
    if (!isEnumerable(obj, name)) {
        $ERROR("Expected obj[" + String(name) + "] to be enumerable, but was not.");
    }
}

function verifyNotEnumerable(obj, name) {
    assert(!Object.getOwnPropertyDescriptor(obj, name).enumerable,
        "Expected obj[" + String(name) + "] to have enumerable:false.");
    if (isEnumerable(obj, name)) {
        $ERROR("Expected obj[" + String(name) + "] NOT to be enumerable, but was.");
    }
}

function verifyConfigurable(obj, name) {
    assert(Object.getOwnPropertyDescriptor(obj, name).configurable,
        "Expected obj[" + String(name) + "] to have configurable:true.");
    if (!isConfigurable(obj, name)) {
        $ERROR("Expected obj[" + String(name) + "] to be configurable, but was not.");
    }
}

function verifyNotConfigurable(obj, name) {
    assert(!Object.getOwnPropertyDescriptor(obj, name).configurable,
        "Expected obj[" + String(name) + "] to have configurable:false.");
    if (isConfigurable(obj, name)) {
        $ERROR("Expected obj[" + String(name) + "] NOT to be configurable, but was.");
    }
}

function checkSequence(arr, message) {
    arr.forEach(function(e, i) {
        if (e !== (i + 1)) {
            $ERROR((message ? message : "Steps in unexpected sequence:") +
                " '" + arr.join(',') + "'");
        }
    });

    return true;
}

function checkSettledPromises(settleds, expected, message) {
    const prefix = message ? '${message}: ' : '';

    assert.sameValue(Array.isArray(settleds), true, '${prefix}Settled values is an array');

    assert.sameValue(
        settleds.length,
        expected.length,
        '${prefix}The settled values has a different length than expected'
    );

    settleds.forEach((settled, i) => {
        assert.sameValue(
            Object.prototype.hasOwnProperty.call(settled, 'status'),
            true,
            '${prefix}The settled value has a property status'
        );

        assert.sameValue(settled.status, expected[i].status, '${prefix}status for item ${i}');

        if (settled.status === 'fulfilled') {
            assert.sameValue(
                Object.prototype.hasOwnProperty.call(settled, 'value'),
                true,
                '${prefix}The fulfilled promise has a property named value'
            );

            assert.sameValue(
                Object.prototype.hasOwnProperty.call(settled, 'reason'),
                false,
                '${prefix}The fulfilled promise has no property named reason'
            );

            assert.sameValue(settled.value, expected[i].value, '${prefix}value for item ${i}');
        } else {
            assert.sameValue(settled.status, 'rejected', '${prefix}Valid statuses are only fulfilled or rejected');

            assert.sameValue(
                Object.prototype.hasOwnProperty.call(settled, 'value'),
                false,
                '${prefix}The fulfilled promise has no property named value'
            );

            assert.sameValue(
                Object.prototype.hasOwnProperty.call(settled, 'reason'),
                true,
                '${prefix}The fulfilled promise has a property named reason'
            );

            assert.sameValue(settled.reason, expected[i].reason, '${prefix}Reason value for item ${i}');
        }
    });
}

function compareArray(a, b) {
    if (b.length !== a.length) {
        return false;
    }

    for (var i = 0; i < a.length; i++) {
        if (!compareArray.isSameValue(b[i], a[i])) {
            return false;
        }
    }
    return true;
}

compareArray.isSameValue = function(a, b) {
    if (a === 0 && b === 0) return 1 / a === 1 / b;
    if (a !== a && b !== b) return true;

    return a === b;
};

assert.compareArray = function(actual, expected, message) {
    var format = compareArray.format;
    assert(
        compareArray(actual, expected),
        'Expected ${format(actual)} and ${format(expected)} to have the same contents. ${(message || "")}'
    );
};

// Copyright 2017 Caitlin Potter. All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/*---
author: Caitlin Potter <caitp@igalia.com>
esid: pending
description: >
  Implementations must defer resolving an async function's Promise until after
  all finally blocks have been evaluated.
flags: [async]
---*/

var f = async function() {
    try {
        return "early-return";
    } finally {
        return await new Promise(function(resolve, reject) {
            resolve("override");
        });
    }
};

f().then(function(value) {
    assert.sameValue(value, "override", "Return in finally block");
}).then($DONE, $DONE);