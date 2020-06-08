
var docs = initDOMHeapCoreLevel1();
var jsUnitCore = initJsUnitCore();
var DOMTestCase = initDOMTestCase(jsUnitCore);   


/**
* 
An Entity is accessed, setNodeValue is called with a non-null argument, but getNodeValue
should still return null.

* @author Curt Arnold
* @see http://www.w3.org/TR/1998/REC-DOM-Level-1-19981001/level-one-core#ID-F68D080
* @see http://www.w3.org/TR/1998/REC-DOM-Level-1-19981001/level-one-core#ID-527DCFF2
*/

     /*
     * @id hc_nodevalue07
     */
     (function hc_nodevalue07() {
   var success; 
    var doc;
      var newNode;
      var newValue;
      var nodeMap;
      var docType;
      
	   
	   
	doc = docs["hc_staff.html"]
           docType = doc.doctype;

      
	if(
	
	!(
	(doc.doctype.content == "text/html")
)

	) {
	jsUnitCore.assertNotNull("docTypeNotNull",docType);
nodeMap = docType.entities;

      jsUnitCore.assertNotNull("entitiesNotNull",nodeMap);
newNode = nodeMap.getNamedItem("alpha");
      jsUnitCore.assertNotNull("entityNotNull",newNode);
newValue = newNode.nodeValue;

      jsUnitCore.assertNull("initiallyNull",newValue);
    newNode.nodeValue = "This should have no effect";

      newValue = newNode.nodeValue;

      jsUnitCore.assertNull("nullAfterAttemptedChange",newValue);
    
	}
	
})()

