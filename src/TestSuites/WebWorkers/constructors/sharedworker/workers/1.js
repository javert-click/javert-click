onconnect = e => {
  e.ports[0].postMessage(['1', self.name]);
};