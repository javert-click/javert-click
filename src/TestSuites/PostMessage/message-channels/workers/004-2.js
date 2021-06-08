//Title: 004-2
onmessage = function(e) {
  var port = e.ports[0];
  port.onmessage = function(e) { // implied start()
    console.log('IFrame received message: '+e.data);
    parent.postMessageWindow(e.data, '*');
  }
}