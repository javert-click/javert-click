
var docs = initDOMHeapCoreLevel1();
var jsUnitCore = initJsUnitCore();
var DOMTestCase = initDOMTestCase(jsUnitCore);   


/**
* 
    The "getOwnerDocument()" method returns null if the target
    node itself is a document.

* @author NIST
* @author Mary Brady
* @see http://www.w3.org/TR/1998/REC-DOM-Level-1-19981001/level-one-core#node-ownerDoc
*/

     /*
     * @id nodegetownerdocumentnull
     */
     (function nodegetownerdocumentnull() {
   var success; 
    var doc;
      var ownerDocument;
      
	   
	   
	doc = docs["staff.xml"]
           ownerDocument = doc.ownerDocument;

      jsUnitCore.assertNull("documentOwnerDocumentNull",ownerDocument);
    
})()

