
var docs = initDOMHeapCoreLevel1();
var jsUnitCore = initJsUnitCore();
var DOMTestCase = initDOMTestCase(jsUnitCore);   


/**
* 
An entity reference is created, setNodeValue is called with a non-null argument, but getNodeValue
should still return null.

* @author Curt Arnold
* @see http://www.w3.org/TR/1998/REC-DOM-Level-1-19981001/level-one-core#ID-F68D080
* @see http://www.w3.org/TR/1998/REC-DOM-Level-1-19981001/level-one-core#ID-11C98490
*/

     /*
     * @id hc_nodevalue03
     */
     (function hc_nodevalue03() {
   var success; 
    var doc;
      var newNode;
      var newValue;
      
	   
	   
	doc = docs["hc_staff.html"]
           
	if(
	
	(doc.doctype.content == "text/html")

	) {
	
	{
		success = false;
		try {
            newNode = doc.createEntityReference("ent1");
        }
		catch(ex) {
      success = (typeof(ex.code) != 'undefined' && ex.code == 9);
		}
		jsUnitCore.assertTrue("throw_NOT_SUPPORTED_ERR",success);
	}

	}
	
		else {
			newNode = doc.createEntityReference("ent1");
      jsUnitCore.assertNotNull("createdEntRefNotNull",newNode);
newValue = newNode.nodeValue;

      jsUnitCore.assertNull("initiallyNull",newValue);
    newNode.nodeValue = "This should have no effect";

      newValue = newNode.nodeValue;

      jsUnitCore.assertNull("nullAfterAttemptedChange",newValue);
    
		}
	
})()

