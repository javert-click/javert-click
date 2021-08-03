import { test, assert_equals, assert_not_equals } from '../../../../../js/DOM/Events/Testharness';

globalThis.GLOBAL = { isWindow: function(){ return true }};

test(() => {
    const assert = "ServiceWorkerGlobalScope" in globalThis ? assert_equals : assert_not_equals;
    assert(globalThis.Worker, undefined);
}, "Worker exposure");
  
test(() => {
    const assert = globalThis.GLOBAL.isWindow() ? assert_not_equals : assert_equals;
    assert(globalThis.SharedWorker, undefined);
}, "SharedWorker exposure");