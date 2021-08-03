let a = 0;

onmessage = (e) => {
    if(e.data === "+1"){
        console.log('scheduling 3s timeout');
        console.log('executing 3s timeout');
        a=a+1;
        postMessage(a);
    } else if(e.data === "+2"){
        console.log('scheduling 1s timeout');
        console.log('executing 1s timeout');
        a=a+2;
        postMessage(a);
    }
}