/*
* To run this file:
* From the environment folder:
* cp js/DOM/HeapComputation/generateCashHeap.js .
* ./js2jsil.native -file generateCashHeap.js -dom
* ./jsil.native -file generateCashHeap.jsil -silent -printheap initDOMHeap
*/

function generate(documents){
  var DOM        = initDOM();
  var HTMLFiles  = initHTMLFiles();
  var docload    = initDocumentLoading(DOM, HTMLFiles);
  var docs = [];
  for(var i = 0; i < documents.length; i++){
      var doc_name   = documents[i];
      var doc        = docload.loadDocument(doc_name);
      docs[doc_name] = doc;
  }
  //var cash       = initCash(doc, this);
  return docs
}

var doc_names = ["cash_events.html", 
              "cash_core.html", 
              "cash_data.html", 
              "cash_attributes.html", 
              "cash_collection.html", 
              "cash_css.html", 
              "cash_dimensions.html"];
              
generate(doc_names);
