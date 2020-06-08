
var docs = initDOMHeapCoreLevel1();
var jsUnitCore = initJsUnitCore();
var DOMTestCase = initDOMTestCase(jsUnitCore);   


/**
* 
    The "getNodeType()" method for an Notation Node
    returns the constant value 12.

    Retrieve the Notation declaration in the DocumentType 
    node and invoke the "getNodeType()" method.   The method
    should return 12. 

* @author NIST
* @author Mary Brady
* @see http://www.w3.org/TR/1998/REC-DOM-Level-1-19981001/level-one-core#ID-111237558
*/

     /*
     * @id nodenotationnodetype
     */
     (function nodenotationnodetype() {
   var success; 
    var doc;
      var docType;
      var notations;
      var notationNode;
      var nodeType;
      
	   
	   
	doc = docs["staff.xml"]
           docType = doc.doctype;

      jsUnitCore.assertNotNull("docTypeNotNull",docType);
notations = docType.notations;

      jsUnitCore.assertNotNull("notationsNotNull",notations);
notationNode = notations.getNamedItem("notation1");
      jsUnitCore.assertNotNull("notationNotNull",notationNode);
nodeType = notationNode.nodeType;

      jsUnitCore.assertEquals("nodeNotationNodeTypeAssert1",12,nodeType);
       
})()

