

var w1 = new SharedWorker('008.js');
w1.port.onmessage = function(e) {
  e.ports[0].postMessage(2);
}