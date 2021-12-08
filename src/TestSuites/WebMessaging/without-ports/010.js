//Title: message clone

import { MessageChannel } from '../../../js/MessagePassing/WebMessaging/MessageChannel';
import { assert_equals, async_test, assert_true, assert_false, assert_array_equals, assert_object_equals, assert_unreached } from '../../../js/DOM/Events/Testharness';
const Window = require('../../../js/DOM/Events/Window');
var window = Window.getInstance();

var err = new Error('foo');
var date = new Date();

function sameDate(d1, d2) {
  return (d1 instanceof Date && d2 instanceof Date && d1.valueOf() == d2.valueOf());
}

function assert_array_equals_(observed, expected, msg) {
  if (observed.length == expected.length) {
    for (var i = 0; i < observed.length; i++) {
      if (observed[i] instanceof Date) {
        observed[i] = sameDate(observed[i], expected[i]);
        expected[i] = true;
      } 
      /*else if (observed[i] instanceof RegExp) {
        observed[i] = sameRE(observed[i], expected[i]);
        expected[i] = true;
      }*/
    }
  }
  assert_array_equals(observed, expected, msg);
}

var test_array = [ undefined,
                     null,
                     false,
                     true,
                     1,
                     NaN,
                     Infinity,
                     'foo',
                     date,
                     "Skipping regex!",///foo/,
                     null/*self*/,
                     null/*err*/];

var cloned_array = [ undefined,
                       null,
                       false,
                       true,
                       1,
                       NaN,
                       Infinity,
                       'foo',
                       date,
                       "Skipping regex!",///foo/,
                       null/*self*/,
                       null/*err*/];

var test_object = {a: undefined,
                     b: null,
                     c: false,
                     d: true,
                     e: 1,
                     f: NaN,
                     g: Infinity,
                     h: 'foo',
                     i: date,
                     j: "Skipping regex!",///foo/,
                     k: null/*self*/,
                     l: [],
                     m: {},
                     n: null /*err*/};

var cloned_object = {a:undefined, b:null, c:false, d:true, e:1, f:NaN, g:Infinity, h:'foo', i: date, j: "Skipping regex!",///foo/,  
k:null, l: [], m: {}, n:null};

var tests = [undefined, null,
               false, true,
               1, NaN, Infinity,
               'foo',
               date,
               "Skipping regex!",///foo/,
               /* ImageData, File, FileData, FileList, */
               null /*self*/,
               test_array,
               test_object,
               null /*err*/];

for (var i = 0; i < tests.length; ++i) {
  window.postMessage(tests[i], '*');
}

var test_undefined = async_test('undefined');
var test_null = async_test('null');
var test_false = async_test('false');
var test_true = async_test('true');
var test_1 = async_test('1');
var test_NaN = async_test('NaN');
var test_Infinity = async_test('Infinity');
var test_string = async_test('string');
var test_date = async_test('date');
var test_regex = async_test('regex');
var test_self = async_test('self');
var test_array = async_test('array');
var test_object = async_test('object');
var test_error = async_test('error');
var test_unreached = async_test('unreached');

var j = 0;
window.onmessage = function(e) {
  switch (j) {
    case 0: test_undefined.step(function() { assert_equals(e.data, undefined); this.done(); }); break;
    case 1: test_null.step(function() { assert_equals(e.data, null); this.done(); }); break;
    case 2: test_false.step(function() { assert_false(e.data); this.done(); }); break;
    case 3: test_true.step(function() { assert_true(e.data); this.done(); }); break;
    case 4: test_1.step(function() { assert_equals(e.data, 1); this.done(); }); break;
    case 5: test_NaN.step(function() { assert_equals(e.data, NaN); this.done(); }); break;
    case 6: test_Infinity.step(function() { assert_equals(e.data, Infinity); this.done(); }); break;
    case 7: test_string.step(function() { assert_equals(e.data, 'foo'); this.done(); }); break;
    case 8: test_date.step(function() { assert_true(sameDate(e.data, date)); this.done(); }); break;
    case 9: test_regex.step(function() { console.log('Skipping RegExp test!'); this.done(); }); break;
    // not testing it any more, as cloning host objects will now raise exceptions. TODO: add (exceptional) tests for these.
    case 10: test_self.step(function() { assert_equals(e.data, null); this.done(); }); break;
    case 11: test_array.step(function() { assert_array_equals_(e.data, cloned_array, 'array'); this.done(); }); break;
    case 12: test_object.step(function() { assert_object_equals(e.data, cloned_object, 'object'); this.done(); }); break;
    case 13:
      test_error.step(function() { assert_equals(e.data, null, 'new Error()'); this.done(); });
      setTimeout(test_unreached.step_func(function() { assert_equals(j, 14); this.done(); }), 50);
      break;
    default: test_unreached.step(function() { assert_unreached('got an unexpected message event ('+j+')'); });
  };
  j++;
}

