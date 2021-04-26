const Worker = require('../../../../MessagePassing/WebWorkers/Worker');

var str = "Bom dia, querido Jose";
var stringReverseWorker = new Worker.Worker('StringReverseWorker.js');
console.log('MAIN: stringReverseWorker created with id '+stringReverseWorker.__id);
var stringRemoveWhiteSpacesWorker = new Worker.Worker('StringRemoveWhiteSpacesWorker.js');
console.log('MAIN: stringRemoveWhiteSpacesWorker created with id '+stringRemoveWhiteSpacesWorker.__id);
console.log('MAIN: going to send message to stringRemoveWhiteSpacesWorker');
stringRemoveWhiteSpacesWorker.postMessage(str);
stringRemoveWhiteSpacesWorker.onmessage = function(e) { console.log('MAIN: got result from stringRemoveWhiteSpacesWorker:'+e.data)};
console.log('MAIN: going to send message to stringReverseWorker');
stringReverseWorker.postMessage(str);
stringReverseWorker.onmessage = function(e) { console.log('MAIN: got result from stringReverseWorker:'+e.data)};