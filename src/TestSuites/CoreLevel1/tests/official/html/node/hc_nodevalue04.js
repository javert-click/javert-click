
var docs = initDOMHeapCoreLevel1();
var jsUnitCore = initJsUnitCore();
var DOMTestCase = initDOMTestCase(jsUnitCore);   


/**
* 
An document type accessed, setNodeValue is called with a non-null argument, but getNodeValue
should still return null.

* @author Curt Arnold
* @see http://www.w3.org/TR/1998/REC-DOM-Level-1-19981001/level-one-core#ID-F68D080
* @see http://www.w3.org/TR/1998/REC-DOM-Level-1-19981001/level-one-core#ID-B63ED1A31
*/

     /*
     * @id hc_nodevalue04
     */
     (function hc_nodevalue04() {
   var success; 
    var doc;
      var newNode;
      var newValue;
      
	   
	   
	doc = docs["hc_staff.html"]
           newNode = doc.doctype;

      	jsUnitCore.assertTrue("docTypeNotNullOrDocIsHTML",
      
	(
	(newNode != null)
 || 
	(doc.doctype.content == "text/html")
)
);

	if(
	
	(newNode != null)

	) {
	jsUnitCore.assertNotNull("docTypeNotNull",newNode);
newValue = newNode.nodeValue;

      jsUnitCore.assertNull("initiallyNull",newValue);
    newNode.nodeValue = "This should have no effect";

      newValue = newNode.nodeValue;

      jsUnitCore.assertNull("nullAfterAttemptedChange",newValue);
    
	}
	
})()

