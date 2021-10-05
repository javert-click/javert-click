//Title: navigator.onLine in dedicated worker

const WorkerInfo = require('../../../js/MessagePassing/WebWorkers/Worker');
const Worker = WorkerInfo.Worker;
const SharedWorkerInfo = require('../../../js/MessagePassing/WebWorkers/SharedWorker');
const SharedWorker = SharedWorkerInfo.SharedWorker;
const Window = require('../../../js/DOM/Events/Window');
const EventInfo = require('../../../js/DOM/Events/Event');
const Event = EventInfo.Event;

//var pre = document.querySelector('pre');
var worker, shared;
try { worker = new Worker('navigator-onLine-worker.js'); } catch(e) { //pre.textContent += '\nnew Worker threw: ' + e.message; 
  console.log('new Worker threw: ' + e.message);
}
try { shared = new SharedWorker('#', ''); } catch(e) { //pre.textContent += '\nnew SharedWorker threw: ' + e.message; 
  console.log('new SharedWorker threw: ' + e.message);
}
if (worker) {
  worker.onmessage = function(e) {
    //pre.textContent += '\ndedicated worker: ' + e.data;
    console.log('dedicated worker: ' + e.data);
  }
}
if (shared) {
  shared.port.onmessage = function(e) {
    //pre.textContent += '\nshared worker: ' + e.data;
    console.log('shared worker: ' + e.data);
  }
}
function update() {
  //pre.textContent += '\n\n' + new Date() + '\n<script>: ' + navigator.onLine;
  console.log('new Date() '+ navigator.onLine);
  if (worker) worker.postMessage(1);
  if (shared) shared.port.postMessage(1);
}
//update();

var window = Window.getInstance();
window.addEventListener('online', update);
window.addEventListener('offline', update);
//Now simulating going online and then offline
var onlinee = new Event('online');
var offlinee = new Event('offline');
console.log('Main: Going online');
navigator.onLine = true;
window.dispatchEvent(onlinee);
console.log('Main: Going offline');
navigator.onLine = false;
window.dispatchEvent(offlinee);