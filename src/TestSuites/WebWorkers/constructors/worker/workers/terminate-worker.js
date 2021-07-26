(function f() {
    console.log('Worker: sending message to main');
    postMessage(1);
    setTimeout(f, 0);
  })();