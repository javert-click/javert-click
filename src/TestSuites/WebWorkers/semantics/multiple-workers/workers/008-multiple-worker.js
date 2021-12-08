const MessageChannel = require('../../../../../js/MessagePassing/WebMessaging/MessageChannel');
MessageChannel = MessageChannel.MessageChannel;

var channel = new MessageChannel();
var i = 0;
onconnect = function(e) {
  i++;
  console.log('SharedWorker: sending message 1 with port'+i);
  e.ports[0].postMessage(1, [channel['port' + i]]);
}