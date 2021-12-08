const location = require('../../../../../../js/MessagePassing/WebMessaging/Location');

postMessage([null, location.href, location.protocol, location.host,
    location.hostname, location.port, location.pathname,
    location.search, location.hash]);