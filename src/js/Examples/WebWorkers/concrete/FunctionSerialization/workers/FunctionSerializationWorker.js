

onmessage = function(e){
    var input = e.data;
    console.log('WORKER: got msg '+input);
    if(typeof e.data === "Function"){
        var result = function(){'Sending another function to main'};
        try {
            postMessage(result);
            console.log('WORKER: message sent back to main');
        }catch(e){
            console.log('WORKER: got error during postMessage: '+e)
        }
    }
}

console.log('WORKER: finished executing worker script');