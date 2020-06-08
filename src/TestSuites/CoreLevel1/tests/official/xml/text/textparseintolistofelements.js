
var docs = initDOMHeapCoreLevel1();
var jsUnitCore = initJsUnitCore();
var DOMTestCase = initDOMTestCase(jsUnitCore);   


/**
* 
    Retrieve the textual data from the last child of the 
    second employee.   That node is composed of two   
    EntityReference nodes and two Text nodes.   After
    the content node is parsed, the "address" Element
    should contain four children with each one of the
    EntityReferences containing one child.

* @author NIST
* @author Mary Brady
* @see http://www.w3.org/TR/1998/REC-DOM-Level-1-19981001/level-one-core#ID-1451460987
* @see http://www.w3.org/TR/1998/REC-DOM-Level-1-19981001/level-one-core#ID-11C98490
* @see http://www.w3.org/TR/1998/REC-DOM-Level-1-19981001/level-one-core#ID-745549614
*/

     /*
     * @id textparseintolistofelements
     */
     (function textparseintolistofelements() {
   var success; 
    var doc;
      var elementList;
      var addressNode;
      var childList;
      var child;
      var length;
      var value;
      var grandChild;
      var result = new Array();

      var expectedNormal = new Array();
      expectedNormal[0] = "1900 Dallas Road";
      expectedNormal[1] = " Dallas, ";
      expectedNormal[2] = "Texas";
      expectedNormal[3] = "\n 98554";

      var expectedExpanded = new Array();
      expectedExpanded[0] = "1900 Dallas Road Dallas, Texas\n 98554";

      
	   
	   
	doc = docs["staff.xml"]
           elementList = doc.getElementsByTagName("address");
      addressNode = elementList.item(1);
      childList = addressNode.childNodes;

      length = childList.length;

      for(var indexN65663 = 0;indexN65663 < childList.length; indexN65663++) {
      child = childList.item(indexN65663);
      value = child.nodeValue;

      
	if(
	
	(value == null)

	) {
	grandChild = child.firstChild;

      jsUnitCore.assertNotNull("grandChildNotNull",grandChild);
value = grandChild.nodeValue;

      result[result.length] = value;

	}
	
		else {
			result[result.length] = value;

		}
	
	}
   
	if(
	(4 == length)
	) {
	DOMTestCase.assertEqualsList("assertEqNormal",expectedNormal,result);
       
	}
	
		else {
			DOMTestCase.assertEqualsList("assertEqCoalescing",expectedExpanded,result);
       
		}
	
})()

