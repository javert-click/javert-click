const SharedWorkerInfo = require('../../../../../js/MessagePassing/WebWorkers/SharedWorker');
const WindowInfo = require('../../../../../js/DOM/Events/Window');

const SharedWorker = SharedWorkerInfo.SharedWorker;
var window = WindowInfo.getInstance();

window.onload = function() {
  var w=new SharedWorker('004-2.js', 'x');
};