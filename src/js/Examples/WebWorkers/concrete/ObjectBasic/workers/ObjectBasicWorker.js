onmessage = function(e){
    var input = e.data;
    console.log('WORKER: Received object.');
    (initObjectUtils()).print(input);
    input.Date = {Day: 27, Month: 08, Year: 2020};
	postMessage(input);
	console.log('WORKER: message sent back to main');
}

console.log('WORKER: finished executing worker script');