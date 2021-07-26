let prt;
const handleCall = e => {
  const log = [];
  for (let i = 0; i < e.data.length; ++i) {
    if (!(e.data[i] in self))
      log.push(e.data[i]);
  }
  //TODOMP! Line below is wrong. Message should not have 'These were missing'
  prt.postMessage(log.join(', '));
  //prt.postMessage('These were missing: '+log.join(', '));
};
onconnect = e => {
  prt = e.ports[0];
  prt.onmessage = handleCall;
};