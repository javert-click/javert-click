onconnect = e => {
    e.ports[0].postMessage(['null', self.name]);
};