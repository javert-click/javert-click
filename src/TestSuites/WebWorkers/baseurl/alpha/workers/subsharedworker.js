onconnect = function(e) {
  console.log('Subsharedworker: sending message gamma');
  e.source.postMessage('gamma');
}