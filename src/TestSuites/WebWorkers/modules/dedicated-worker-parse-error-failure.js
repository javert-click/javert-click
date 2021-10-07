//Title: DedicatedWorker: parse error failure</title>
import { promise_test, assert_equals } from '../../../js/DOM/Events/Testharness';
const WorkerInfo = require('../../../js/MessagePassing/WebWorkers/Worker');
const Worker = WorkerInfo.Worker;
const PromiseInfo = require('../../../js/Promises/Promise');
const Promise = PromiseInfo.Promise;
const Window = require('../../../js/DOM/Events/Window');
const window = Window.getInstance();
const EventInfo = require('../../../js/DOM/Events/Event');
const Event = EventInfo.Event;

window.checkErrorArguments = args => {
  console.log('Running window.checkErrorArguments');
  assert_equals(args.length, 1);
  assert_equals(args[0].constructor, Event);
};

// Check if module scripts are supported on dedicated workers. There is no
// direct way to detect it, so we assume it's supported when static import is
// available on the workers.
//
// This check is necessary to appropriately test parse error handling because
// we need to distinguish the parse error invoked by unsupported "import" in
// the top-level script from the parse error invoked by the statically imported
// script which is the one we want to check in this test.
/*promise_setup(async () => {
  const scriptURL = 'resources/static-import-worker.js';
  const worker = new Worker(scriptURL, { type: 'module' });
  worker.postMessage('Send message for tests from main script.');
  const supportsModuleWorkers = await new Promise((resolve, reject) => {
    worker.onmessage = e => {
      resolve(e.data.length == 1 && e.data[0] == 'export-on-load-script.js');
    };
    worker.onerror = () => resolve(false);
  });
  assert_implements(
    supportsModuleWorkers,
    "Static import must be supported on module dedicated worker to run this test."
  );
});*/

promise_test(async () => {
  const scriptURL = 'resources/syntax-error.js';
  //const scriptURL = 'backup_worker.js';
  const worker = new Worker(scriptURL, { type: 'module' });
  const args = await new Promise(resolve =>
      { worker.onerror = () => { resolve(arguments); }});
  window.checkErrorArguments(args);
}, 'Module worker construction for script with syntax error should dispatch ' +
   'an event named error.');

/*promise_test(async () => {
  const scriptURL = 'resources/static-import-syntax-error.js';
  const worker = new Worker(scriptURL, { type: 'module' });
  const args = await new Promise(resolve =>
      worker.onerror = (...args) => resolve(args));
  window.checkErrorArguments(args);
}, 'Static import on module worker for script with syntax error should ' +
   'dispatch an event named error.');*/