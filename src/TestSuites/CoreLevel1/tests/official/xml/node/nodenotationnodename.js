
var docs = initDOMHeapCoreLevel1();
var jsUnitCore = initJsUnitCore();
var DOMTestCase = initDOMTestCase(jsUnitCore);   


/**
* 
    The string returned by the "getNodeName()" method for a 
    Notation Node is the name of the notation.

    Retrieve the Notation declaration inside the   
    DocumentType node and check the string returned 
    by the "getNodeName()" method.   It should be equal to 
    "notation1". 

* @author NIST
* @author Mary Brady
* @see http://www.w3.org/TR/1998/REC-DOM-Level-1-19981001/level-one-core#ID-F68D095
*/

     /*
     * @id nodenotationnodename
     */
     (function nodenotationnodename() {
   var success; 
    var doc;
      var docType;
      var notations;
      var notationNode;
      var notationName;
      
	   
	   
	doc = docs["staff.xml"]
           docType = doc.doctype;

      jsUnitCore.assertNotNull("docTypeNotNull",docType);
notations = docType.notations;

      jsUnitCore.assertNotNull("notationsNotNull",notations);
notationNode = notations.getNamedItem("notation1");
      jsUnitCore.assertNotNull("notationNotNull",notationNode);
notationName = notationNode.nodeName;

      jsUnitCore.assertEquals("nodeName","notation1",notationName);
       
})()

