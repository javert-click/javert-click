let a = 0;

onmessage = (e) => {
    const port = e.ports[0];
    if(e.data === "+1"){
        a=a+1;
        port.postMessage(a);
    } else if(e.data === "+2"){
        a=a+2;
        port.postMessage(a);
    }
}