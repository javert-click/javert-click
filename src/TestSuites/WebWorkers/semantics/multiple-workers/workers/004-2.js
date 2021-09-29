var port;
onconnect = function(e) {
  console.log('Worker: onconnect, port: '+port);
  if (!port)
    port = e.ports[0];
  console.log('Worker: Going to send message to port '+port.__id);
  port.postMessage(1);
  console.log('Message sent!');
}