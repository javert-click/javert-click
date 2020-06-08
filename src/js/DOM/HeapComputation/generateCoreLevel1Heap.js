/*
* To run this file:
* cp js/DOM/HeapComputation/generateCoreLevel1Heap.js .
* ./js2jsil.native -file generateCoreLevel1Heap.js -dom_level1
* ./jsil.native -file generateCoreLevel1Heap.jsil -printheap initDOMHeapCoreLevel1
*/

function generate(documents){
    var DOM       = initDOM();
    var HTMLFiles = initHTMLFiles();
    var docload   = initDocumentLoading(DOM, HTMLFiles);
    var docs      = [];
    
    for(var i = 0; i < documents.length; i++){
        var doc_name = documents[i];
        var doc    = docload.loadDocument(doc_name);
        docs[doc_name] = doc;
    }
    return docs;
}

var doc_names = ["staff.xml", "hc_staff.xml", "hc_nodtdstaff.xml", "hc_staff.html"];
generate(doc_names);

