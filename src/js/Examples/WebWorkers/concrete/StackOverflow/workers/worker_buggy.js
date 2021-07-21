let a = 0;

onmessage = (e) => {
    if(e.data === "+1"){
        console.log('scheduling 3s timeout');
        setTimeout(()=>{
          console.log('executing 3s timeout');
          a=a+1;
          postMessage(a);
        },3000);
    } else if(e.data === "+2"){
        console.log('scheduling 1s timeout');
        setTimeout(()=>{
          console.log('executing 1s timeout');
          a=a+2;
          postMessage(a);
        },1000);
    }
}