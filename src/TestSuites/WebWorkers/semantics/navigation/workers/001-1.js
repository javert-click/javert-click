onload = function() {
    var worker = new Worker('001-1.js');
    worker.onmessage = function(e) {
      var started = !!parent.date;
      parent.date = e.data;
      if (!started) {
        parent.start_test()
      }
    }
  }
  <a href='data:text/html,<title>foo</title><script>onload=function(){window.parent.postMessage({title: window.document.title}, "*")}</script>'>link</a>