onmessage = function(e){
    var port = e.ports[0];
    port.onmessage = function(e){
        console.log('WORKER (TRANSFERRED PORT) : Received message '+e.data);
    };
    console.log('WORKER: Received message '+e.data);
	postMessage("MSG 2");
	console.log('WORKER: message sent back to main');
}

console.log('WORKER: finished executing worker script');