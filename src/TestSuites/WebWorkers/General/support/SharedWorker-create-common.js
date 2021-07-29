import { SharedWorker } from '../../../../js/MessagePassing/WebWorkers/SharedWorker';

function createWorker()
{
    var worker = new SharedWorker('SharedWorker-common.js', 'name');
    worker.port.onmessage = function(evt) { worker.onmessage(evt); };
    worker.postMessage = function(msg, port) { worker.port.postMessage(msg, port); };
    return worker;
}

export { createWorker }