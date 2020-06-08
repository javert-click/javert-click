
var docs = initDOMHeapCoreLevel1();
var jsUnitCore = initJsUnitCore();
var DOMTestCase = initDOMTestCase(jsUnitCore);   


/**
* 
    The "getNodeType()" method for a DocumentType Node
    returns the constant value 10.

* @author NIST
* @author Mary Brady
* @see http://www.w3.org/TR/1998/REC-DOM-Level-1-19981001/level-one-core#ID-111237558
*/

     /*
     * @id nodedocumenttypenodetype
     */
     (function nodedocumenttypenodetype() {
   var success; 
    var doc;
      var documentTypeNode;
      var nodeType;
      
	   
	   
	doc = docs["staff.xml"]
           documentTypeNode = doc.doctype;

      jsUnitCore.assertNotNull("doctypeNotNull",documentTypeNode);
nodeType = documentTypeNode.nodeType;

      jsUnitCore.assertEquals("nodeType",10,nodeType);
       
})()

