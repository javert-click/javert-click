import { promise_test, assert_equals } from '../../../js/DOM/Events/Testharness';
const WorkerInfo = require('../../../js/MessagePassing/WebWorkers/Worker');
const Worker = WorkerInfo.Worker;
const PromiseInfo = require('../../../js/Promises/Promise');
const Promise = PromiseInfo.Promise;

promise_test(async () => {
    const e = await new Promise((resolve, reject) => {
      const worker = new Worker("WorkerNavigator.js");
      worker.onmessage = resolve;
    });

    assert_equals(e.data.brands, undefined);
    assert_equals(e.data.mobile, undefined);
    assert_equals(e.data.getHighEntropyValues, undefined);
}, "Test that userAgentData is not available in workers in non-secure contexts");