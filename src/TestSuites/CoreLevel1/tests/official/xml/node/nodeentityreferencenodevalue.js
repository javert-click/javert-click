
var docs = initDOMHeapCoreLevel1();
var jsUnitCore = initJsUnitCore();
var DOMTestCase = initDOMTestCase(jsUnitCore);   


/**
* 
    The string returned by the "getNodeValue()" method for an 
    EntityReference Node is null.
    
    Retrieve the first Entity Reference node from the last
    child of the second employee and check the string 
    returned by the "getNodeValue()" method.   It should be 
    equal to null.

* @author NIST
* @author Mary Brady
* @see http://www.w3.org/TR/1998/REC-DOM-Level-1-19981001/level-one-core#ID-F68D080
*/

     /*
     * @id nodeentityreferencenodevalue
     */
     (function nodeentityreferencenodevalue() {
   var success; 
    var doc;
      var elementList;
      var entRefAddr;
      var entRefNode;
      var entRefValue;
      var nodeType;
      
	   
	   
	doc = docs["staff.xml"]
           elementList = doc.getElementsByTagName("address");
      entRefAddr = elementList.item(1);
      entRefNode = entRefAddr.firstChild;

      nodeType = entRefNode.nodeType;

      
	if(
	(3 == nodeType)
	) {
	entRefNode = doc.createEntityReference("ent2");
      jsUnitCore.assertNotNull("createdEntRefNotNull",entRefNode);

	}
	entRefValue = entRefNode.nodeValue;

      jsUnitCore.assertNull("entRefNodeValue",entRefValue);
    
})()

