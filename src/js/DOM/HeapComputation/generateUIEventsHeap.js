/*
* To run this file:
* From the environment folder:
* cp js/DOM/HeapComputation/generateUIEventsHeap.js .
* ./js2jsil.native -file generateUIEventsHeap.js -dom
* ./jsil.native -file generateUIEventsHeap.jsil -silent -printheap initDOMUIEventsHeap
*/

function generate(){
    var DOM        = initDOM();
    var HTMLFiles  = initUIEventsFiles();
    var docload    = initDocumentLoading(DOM, HTMLFiles);
    var files = HTMLFiles.files;
    var docs = [];
    for(var file in files){
        var doc        = docload.loadDocument(file);
        docs[file] = doc;
    }
    //var cash       = initCash(doc, this);
    return docs
}
                
generate();

