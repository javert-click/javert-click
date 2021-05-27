onmessage = function(e){
    var input = e.data;
	console.log('WORKER: got arr. Length: '+input.length+', 1st elem: '+input[0]+', 2nd elem: '+input[1]+', 3rd elem: '+input[2]+', 4th elem?'+input[3]);
	postMessage(["lalala"]);
	console.log('WORKER: message sent back to main');
}

console.log('WORKER: finished executing worker script');