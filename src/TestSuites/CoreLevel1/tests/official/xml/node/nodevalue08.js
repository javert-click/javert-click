
var docs = initDOMHeapCoreLevel1();
var jsUnitCore = initJsUnitCore();
var DOMTestCase = initDOMTestCase(jsUnitCore);   


/**
* 
An notation is accessed, setNodeValue is called with a non-null argument, but getNodeValue
should still return null.

* @author Curt Arnold
* @see http://www.w3.org/TR/1998/REC-DOM-Level-1-19981001/level-one-core#ID-F68D080
* @see http://www.w3.org/TR/1998/REC-DOM-Level-1-19981001/level-one-core#ID-5431D1B9
*/

     /*
     * @id nodevalue08
     */
     (function nodevalue08() {
   var success; 
    var doc;
      var docType;
      var newNode;
      var newValue;
      var nodeMap;
      
	   
	   
	doc = docs["staff.xml"]
           docType = doc.doctype;

      jsUnitCore.assertNotNull("docTypeNotNull",docType);
nodeMap = docType.notations;

      jsUnitCore.assertNotNull("notationsNotNull",nodeMap);
newNode = nodeMap.getNamedItem("notation1");
      jsUnitCore.assertNotNull("notationNotNull",newNode);
newValue = newNode.nodeValue;

      jsUnitCore.assertNull("initiallyNull",newValue);
    newNode.nodeValue = "This should have no effect";

      newValue = newNode.nodeValue;

      jsUnitCore.assertNull("nullAfterAttemptedChange",newValue);
    
})()

