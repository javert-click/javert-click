//Title: cache manifest
const WorkerInfo = require('../../../js/MessagePassing/WebWorkers/Worker');
const Worker = WorkerInfo.Worker;

var sessionStorage = { testHasBeenLoadedBefore: true };

//var p = document.querySelector('p');
if (sessionStorage.testHasBeenLoadedBefore) {
  var worker = new Worker('application-cache-dedicated-worker.js');
  var pass;
  worker.onmessage = function(e) {
    //p.textContent = 'PASS';
    console.log('PASS');
    pass = true;
  }
  setTimeout(function(){
    if (!pass)
      //p.textContent = 'FAIL (got no message from worker)';
      console.log('FAIL (got no message from worker)');
  }, 250);
} else {
  sessionStorage.testHasBeenLoadedBefore = true;
  //p.textContent = 'Enable offline mode and then reload this test. It should say PASS.';
  console.log('Enable offline mode and then reload this test. It should say PASS.');
}