import {test, assert_true, done} from "../../../../../js/DOM/Events/Testharness";

var expected = [
  'postMessage', 'onmessage', /* DedicatedWorkerGlobalScope */
  'self', 'location', 'close', 'onerror', 'onoffline', 'ononline', /* WorkerGlobalScope */
  'addEventListener', 'removeEventListener', 'dispatchEvent', /* EventListener */
  'importScripts', 'navigator', /* WorkerUtils */
  'setTimeout', 'clearTimeout', 'setInterval', 'clearInterval', /* WindowTimers */
  'btoa', 'atob' /* WindowBase64 */
];
for (var i = 0; i < expected.length; ++i) {
  var property = expected[i];
  console.log('Worker: going to test if property '+property+' is in self');
  test(function() {
    assert_true(property in self);
  }, "existence of " + property);
}

done();