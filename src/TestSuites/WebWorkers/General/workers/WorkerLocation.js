//const location = require('../../../../js/MessagePassing/WebMessaging/Location');

var obj = new Object();
obj.location = location.toString();
console.log('Setting data.location to '+obj.location);
obj.href     = location.href;
obj.origin   = location.origin;
obj.protocol = location.protocol;
obj.host     = location.host;
obj.hostname = location.hostname;
obj.port     = location.port;
obj.pathname = location.pathname;
obj.search   = location.search;
obj.hash     = location.hash;

console.log('Worker: going to post message');
postMessage(obj);