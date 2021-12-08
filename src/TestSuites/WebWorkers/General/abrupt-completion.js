import { Worker } from '../../../js/MessagePassing/WebWorkers/Worker';
import { SharedWorker } from '../../../js/MessagePassing/WebWorkers/SharedWorker';
import { promise_test, assert_equals, assert_not_equals } from '../../../js/DOM/Events/Testharness';
import { Promise } from '../../../js/Promises/Promise';
import { MessageChannel } from '../../../js/MessagePassing/WebMessaging/MessageChannel';

// Tests that a {Dedicated,Shared}Worker keeps running even if its script
// evaluation results in an abrupt completion. This corresponds to the "run a
// worker" algorithm disregarding the return value of "run the {classic,module}
// script" in its step 24:
//
// "If script is a classic script, then run the classic script script.
// Otherwise, it is a module script; run the module script script."

async function testWorker(worker) {
    console.log('I am inside testWorker');
    await new Promise(resolve => {
      worker.onerror = e => {
          console.log('I am in worker.onerror! message: '+e.message);
          console.log('e.preventDefault: '+e.preventDefault);
        assert_not_equals(e.message.indexOf("uncaught-exception"), -1,
                          "Correct uncaught exception thrown by worker");
  
        // Suppress the exception.
        e.preventDefault();
  
        resolve();
      }
    });
  
    return new Promise(resolve => {
      const channel = new MessageChannel();
  
      channel.port1.onmessage = e => {
        assert_equals(e.data, "handler-before-throw", "Correct message handler.");
        resolve();
      };
  
      if (worker instanceof SharedWorker) {
        worker.port.postMessage("", [channel.port2]);
      } else {
        worker.postMessage("", [channel.port2]);
      }
    });
  }
  
  promise_test(async t => {
    const worker = new Worker("support/abrupt-completion-worker.js");
    console.log('Worker created, portId: '+worker.__port.__id);
    return testWorker(worker);
  }, "DedicatedWorker should correctly handle abrupt completion");
  
  // This is wrong, SharedWorkerGlobalScope does not seem to expose 'onmessage' property
  /*promise_test(async t => {
    const worker = new SharedWorker("support/abrupt-completion-worker.js");
    console.log('SharedWorker created, portId: '+worker.__port.__id);
    return testWorker(worker);
  }, "SharedWorker should correctly handle abrupt completion");*/