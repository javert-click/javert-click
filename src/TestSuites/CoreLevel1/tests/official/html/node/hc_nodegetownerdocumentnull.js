
var docs = initDOMHeapCoreLevel1();
var jsUnitCore = initJsUnitCore();
var DOMTestCase = initDOMTestCase(jsUnitCore);   


/**
* 

    The "getOwnerDocument()" method returns null if the target

    node itself is a document.

    

    Invoke the "getOwnerDocument()" method on the master 

    document.   The Document returned should be null.


* @author Curt Arnold
* @see http://www.w3.org/TR/1998/REC-DOM-Level-1-19981001/level-one-core#node-ownerDoc
*/

     /*
     * @id hc_nodegetownerdocumentnull
     */
     (function hc_nodegetownerdocumentnull() {
   var success; 
    var doc;
      var ownerDocument;
      
	   
	   
	doc = docs["hc_staff.html"]
           ownerDocument = doc.ownerDocument;

      jsUnitCore.assertNull("nodeGetOwnerDocumentNullAssert1",ownerDocument);
    
})()

