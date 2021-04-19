onmessage = function(e){
    var input = e.data;
	console.log('WORKER (StringReverse): calculating string reverse of '+input);
    var result = stringReverse(input);
	console.log('WORKER (StringReverse): result: '+result);
	postMessage(result);
	console.log('WORKER (StringReverse): message sent back to main');
}

function stringReverse(s){
    var res = "";
    for(var i = s.length-1; i >=0; i--){
        res = res.concat(s.charAt(i));
    }
    return res;
}

console.log('WORKER (StringReverse): finished executing worker script');