const BroadcastChannelInfo = require('../../../../js/MessagePassing/PostMessage/BroadcastChannel');
const BroadcastChannel = BroadcastChannelInfo.BroadcastChannel;

const channel = new BroadcastChannel("channel name");
channel.postMessage("ping");
console.log('WORKER: finished executing script');