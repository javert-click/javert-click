self.onerror = function(evt) {
  console.log('WORKER: running self.onerror');
  postMessage('error');
  return true;
}

self.onmessage = function(evt) {
  console.log('WORKER: got msg '+evt.data);
  if (evt.data === "first")
    throw Error();
  else
    postMessage(evt.data);
}