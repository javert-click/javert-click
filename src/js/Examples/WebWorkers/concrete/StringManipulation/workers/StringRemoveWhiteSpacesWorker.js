
onmessage = function(e){
    var input = e.data;
	console.log('WORKER (RemoveWhiteSpaces): removing whitespaces of '+input);
    var result = removeWhiteSpaces(input);
	console.log('WORKER (RemoveWhiteSpaces): result: '+result);
	postMessage(result);
	console.log('WORKER (RemoveWhiteSpaces): message sent back to main');
}

function removeWhiteSpaces(string){
    var wc = string.indexOf(" ");
    if(wc !== -1){
        return removeWhiteSpaces(string.substring(0, wc)+string.substring(wc+1, string.length));
    }else{
        return string;
    }
}

console.log('WORKER (RemoveWhiteSpaces): finished executing worker script');