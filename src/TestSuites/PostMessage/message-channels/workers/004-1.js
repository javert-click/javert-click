
//Title: 004-1
console.log('executing 004-1.js script');
onmessage = function(e) {
  console.log('IFrame got message '+e.data);
  var port = e.ports[0];
  port.postMessage(e.data);
}
console.log('finished executing 004-1.js script');