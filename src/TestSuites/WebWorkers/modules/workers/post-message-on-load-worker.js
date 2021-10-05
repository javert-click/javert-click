if ('DedicatedWorkerGlobalScope' in self &&
    self instanceof DedicatedWorkerGlobalScope) {
  postMessage('LOADED');
} else if (
    'SharedWorkerGlobalScope' in self &&
    self instanceof SharedWorkerGlobalScope) {
        console.log('found type shared worker');
  self.onconnect = e => {
    e.ports[0].postMessage('LOADED');
  };
}