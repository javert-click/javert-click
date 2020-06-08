
var docs = initDOMHeapCoreLevel1();
var jsUnitCore = initJsUnitCore();
var DOMTestCase = initDOMTestCase(jsUnitCore);   


/**
* 
    The "getAttributes()" method invoked on a Notation 
    Node returns null.

    Retrieve the Notation declaration inside the DocumentType
    node and invoke the "getAttributes()" method on the 
    Notation Node.   It should return null. 

* @author NIST
* @author Mary Brady
* @see http://www.w3.org/TR/1998/REC-DOM-Level-1-19981001/level-one-core#ID-84CF096
*/

     /*
     * @id nodenotationnodeattributes
     */
     (function nodenotationnodeattributes() {
   var success; 
    var doc;
      var docType;
      var notations;
      var notationNode;
      var attrList;
      
	   
	   
	doc = docs["staff.xml"]
           docType = doc.doctype;

      jsUnitCore.assertNotNull("docTypeNotNull",docType);
notations = docType.notations;

      jsUnitCore.assertNotNull("notationsNotNull",notations);
notationNode = notations.getNamedItem("notation1");
      jsUnitCore.assertNotNull("notationNotNull",notationNode);
attrList = notationNode.attributes;

      jsUnitCore.assertNull("nodeNotationNodeAttributesAssert1",attrList);
    
})()

