onmessage = function(e){
    var input = e.data;
	console.log('WORKER: calculating fibonacci of '+input);
    var result = fibonacci(input);
	console.log('WORKER: result fibonacci: '+result);
	postMessage(result);
	console.log('WORKER: message sent back to main');
}

function fibonacci(n){
	if(n < 2) return n;
	return fibonacci(n-1) + fibonacci(n-2);
}

console.log('WORKER: finished executing worker script');