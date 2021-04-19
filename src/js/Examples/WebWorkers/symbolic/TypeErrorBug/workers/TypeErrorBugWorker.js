onmessage = function(e){
    var input = e.data;
	console.log('WORKER: accessing property of obj '+input);
    var result = getProp(input);
	console.log('WORKER: result prop: '+result);
	postMessage(result);
	console.log('WORKER: message sent back to main');
}

//var portIdWorker = this.port.__id;
//console.log('executing worker, port: '+portIdWorker);

function getProp(n){
	console.log('WORKER: will try to access property of null object');
	return n.lalala;
	//if(n < 2) return n;
	//return fibonacci(n-1) + fibonacci(n-2);
}

console.log('WORKER: finished executing worker script');