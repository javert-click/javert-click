
var docs = initDOMHeapCoreLevel1();
var jsUnitCore = initJsUnitCore();
var DOMTestCase = initDOMTestCase(jsUnitCore);   


/**
* 
    The string returned by the "getNodeValue()" method for a 
    Notation Node is null.

    Retrieve the Notation declaration inside the 
    DocumentType node and check the string returned 
    by the "getNodeValue()" method.   It should be equal to 
    null. 

* @author NIST
* @author Mary Brady
* @see http://www.w3.org/TR/1998/REC-DOM-Level-1-19981001/level-one-core#ID-F68D080
*/

     /*
     * @id nodenotationnodevalue
     */
     (function nodenotationnodevalue() {
   var success; 
    var doc;
      var docType;
      var notations;
      var notationNode;
      var notationValue;
      
	   
	   
	doc = docs["staff.xml"]
           docType = doc.doctype;

      jsUnitCore.assertNotNull("docTypeNotNull",docType);
notations = docType.notations;

      jsUnitCore.assertNotNull("notationsNotNull",notations);
notationNode = notations.getNamedItem("notation1");
      jsUnitCore.assertNotNull("notationNotNull",notationNode);
notationValue = notationNode.nodeValue;

      jsUnitCore.assertNull("nodeValue",notationValue);
    
})()

