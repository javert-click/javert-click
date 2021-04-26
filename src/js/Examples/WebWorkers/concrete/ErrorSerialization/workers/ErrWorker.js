

onmessage = function(e){
    var input = e.data;
    console.log('WORKER: got error '+input);
    if(e.data.message === "Type is wrong"){
        var result = new ReferenceError("opsss");
	    postMessage(result);
	    console.log('WORKER: message sent back to main');
    }
}

console.log('WORKER: finished executing worker script');