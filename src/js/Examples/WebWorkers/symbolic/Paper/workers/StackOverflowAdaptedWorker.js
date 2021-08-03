console.log('Worker: executing script');

function isPrime(num) {
    if (num === 2) {
      return true;
    } else if (num > 1) {
      for (var i = 2; i < num; i++) {
        if (num % i !== 0) {
          return true;
        } else if (num === i * i) {
          return false
        } else {
          return false;
        }
      }
    } else {
      return false;
    }  
}

function fibonacci(n){
  if(n < 2) return n;
  return fibonacci(n-1) + fibonacci(n-2);
}

onmessage = (e) => {
    var op = e.data;
    if(op.name === 'IS_PRIME'){
        var prime = isPrime(op.number);
        postMessage(prime);
    }else if(op.name === 'FIBONACCI'){
        var fib = fibonacci(op.number);
        postMessage(fib);
    }
}

console.log('Worker: finished script');