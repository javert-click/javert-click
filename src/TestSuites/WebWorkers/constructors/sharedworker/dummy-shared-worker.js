import { test, assert_unreached } from '../../../../js/DOM/Events/Testharness';
const SharedWorkerInfo = require('../../../../js/MessagePassing/WebWorkers/SharedWorker');
const SharedWorker = SharedWorkerInfo.SharedWorker;

test(() => {
    try{
        const worker = new SharedWorker('dummy-shared-worker-worker.js');
        console.log('TEST PASSED');
    } catch (e){
        assert_unreached('Creating SharedWorker with empty name should not throw');
    }
});