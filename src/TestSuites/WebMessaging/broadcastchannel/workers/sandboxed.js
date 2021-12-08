const BroadcastChannelInfo = require('../../../../js/MessagePassing/WebMessaging/BroadcastChannel');
const BroadcastChannel = BroadcastChannelInfo.BroadcastChannel;

try {
  let c = new BroadcastChannel('foo');
  parent.postMessage('Created', '*');
} catch (e) {
  parent.postMessage('Exception: ' + e.name, '*');
}