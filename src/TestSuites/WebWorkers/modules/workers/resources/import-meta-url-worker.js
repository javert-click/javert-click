if ('DedicatedWorkerGlobalScope' in self &&
    self instanceof DedicatedWorkerGlobalScope) {
  postMessage(import.meta.url);
} else if (
    'SharedWorkerGlobalScope' in self &&
    self instanceof SharedWorkerGlobalScope) {
  self.onconnect = e => {
    console.log('Worker: Sending '+import.meta.url+' as message to main');
    e.ports[0].postMessage(import.meta.url);
  };
}