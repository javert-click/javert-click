onconnect = e => {
  e.ports[0].postMessage(['undefined', self.name]);
};