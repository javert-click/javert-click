onconnect = e => {
  console.log('Do I have name? '+self.name);
  e.ports[0].postMessage(['Infinity', self.name]);
};