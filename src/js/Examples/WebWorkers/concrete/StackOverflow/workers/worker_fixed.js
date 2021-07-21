let a = 0;

onmessage = (e) => {
    const port = e.ports[0];
    if(e.data === "+1"){
        setTimeout(()=>{
            a=a+1;
            port.postMessage(a);
        },3000);
    } else if(e.data === "+2"){
        setTimeout(()=>{
            a=a+2;
            port.postMessage(a);
        },1000);
    }
}