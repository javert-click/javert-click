//Title: structured clone of message

import { async_test, assert_equals, assert_object_equals, assert_array_equals, assert_unreached } from '../../../../js/DOM/Events/Testharness';
const WorkerInfo = require('../../../../js/MessagePassing/WebWorkers/Worker');
const Worker = WorkerInfo.Worker;

var wrapper_test = async_test();
var tests = [
      {test:async_test('undefined'), check:function(e) { assert_equals(e.data, undefined); }},
      {test:async_test('null'), check:function(e) { assert_equals(e.data, null); }},
      {test:async_test('false'), check:function(e) { assert_false(e.data); }},
      {test:async_test('true'), check:function(e) { assert_true(e.data); }},
      {test:async_test('1'), check:function(e) { assert_equals(e.data, 1); }},
      {test:async_test('NaN'), check:function(e) { assert_equals(e.data, NaN); }},
      {test:async_test('Infinity'), check:function(e) { assert_equals(e.data, Infinity); }},
      {test:async_test('string'), check:function(e) { assert_equals(e.data, 'foo'); }},
      {test:async_test('date'), check:function(e) { assert_equals(e.data instanceof Date, true); }},
      // NO SUPPORT FOR REGEXP
      //{test:async_test('regexp'), check:function(e) { assert_equals('' + e.data, '/foo/'); assert_equals(e.data instanceof RegExp, true, 'e.data instanceof RegExp'); }},
      {test:async_test('self'), check:function(e) { assert_equals(e.data, null); }},
      {test:async_test('array'), check:function(e) { assert_array_equals(e.data, [undefined, null, false, true, 1, NaN, Infinity, 'foo', null, null]); }},
      {test:async_test('object'), check:function(e) { assert_object_equals(e.data, {a:undefined, b:null, c:false, d:true, e:1, f:NaN, g:Infinity, h:'foo', k:null, n:null}); }},
      {test:async_test('error'), check:function(e) { assert_equals(e.data, null, 'new Error()'); }},
      {test:wrapper_test, check:function(e) { assert_unreached(); }}
];
// make wrapper_test pass after 500ms
setTimeout(tests[tests.length-1].test.step_func(function() {
  this.done();
}), 500);

wrapper_test.step(function() {
  var worker = new Worker('structured-clone-message-worker.js');
  var i = 0;
  worker.onmessage = function(e) {
    tests[i].test.step(function() { tests[i].check(e); this.done(); });
    i++;
  };
});