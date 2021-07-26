

onconnect = e => {
  e.ports[0].postMessage([e.data === '', e instanceof MessageEvent.MessageEvent, e.ports.length == 1]);
};