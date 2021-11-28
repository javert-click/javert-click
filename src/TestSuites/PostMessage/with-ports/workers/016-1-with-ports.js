onmessage = function(e) { 
    console.log('iframe got message '+e.data+'. Sending message to window of id '+parent.__id);
    parent.postMessage(e.origin, '*'); 
}; 
parent.postMessage('loaded', '*');