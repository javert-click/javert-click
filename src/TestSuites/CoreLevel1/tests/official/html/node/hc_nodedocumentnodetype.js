
var docs = initDOMHeapCoreLevel1();
var jsUnitCore = initJsUnitCore();
var DOMTestCase = initDOMTestCase(jsUnitCore);   


/**
* 
The "getNodeType()" method for a Document Node
returns the constant value 9.

Retrieve the document and invoke the "getNodeType()" 
method.   The method should return 9. 

* @author Curt Arnold
* @see http://www.w3.org/TR/1998/REC-DOM-Level-1-19981001/level-one-core#i-Document
* @see http://www.w3.org/TR/1998/REC-DOM-Level-1-19981001/level-one-core#ID-111237558
*/

     /*
     * @id hc_nodedocumentnodetype
     */
     (function hc_nodedocumentnodetype() {
   var success; 
    var doc;
      var nodeType;
      
	   
	   
	doc = docs["hc_staff.html"]
           nodeType = doc.nodeType;

      jsUnitCore.assertEquals("nodeDocumentNodeTypeAssert1",9,nodeType);
       
})()

