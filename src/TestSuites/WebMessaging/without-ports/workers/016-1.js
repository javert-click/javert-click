onmessage = function(e) { 
    parent.postMessage(e.origin, '*'); 
}; 
parent.postMessage('loaded', '*');