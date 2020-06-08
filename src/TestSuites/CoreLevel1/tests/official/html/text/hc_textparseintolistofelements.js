
var docs = initDOMHeapCoreLevel1();
var jsUnitCore = initJsUnitCore();
var DOMTestCase = initDOMTestCase(jsUnitCore);   


/**
* 
    Retrieve the textual data from the last child of the 
    second employee.   That node is composed of two   
    EntityReference nodes and two Text nodes.   After
    the content node is parsed, the "acronym" Element
    should contain four children with each one of the
    EntityReferences containing one child.

* @author Curt Arnold
* @see http://www.w3.org/TR/1998/REC-DOM-Level-1-19981001/level-one-core#ID-1451460987
* @see http://www.w3.org/TR/1998/REC-DOM-Level-1-19981001/level-one-core#ID-11C98490
* @see http://www.w3.org/TR/1998/REC-DOM-Level-1-19981001/level-one-core#ID-745549614
*/

     /*
     * @id hc_textparseintolistofelements
     */
     (function hc_textparseintolistofelements() {
   var success; 
    var doc;
      var elementList;
      var addressNode;
      var childList;
      var child;
      var value;
      var grandChild;
      var length;
      var result = new Array();

      var expectedNormal = new Array();
      expectedNormal[0] = "β";
      expectedNormal[1] = " Dallas, ";
      expectedNormal[2] = "γ";
      expectedNormal[3] = "\n 98554";

      var expectedExpanded = new Array();
      expectedExpanded[0] = "β Dallas, γ\n 98554";

      
	   
	   
	doc = docs["hc_staff.html"]
           elementList = doc.getElementsByTagName("acronym");
      addressNode = elementList.item(1);
      childList = addressNode.childNodes;

      length = childList.length;

      for(var indexN65660 = 0;indexN65660 < childList.length; indexN65660++) {
      child = childList.item(indexN65660);
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
	(1 == length)
	) {
	DOMTestCase.assertEqualsList("assertEqCoalescing",expectedExpanded,result);
       
	}
	
		else {
			DOMTestCase.assertEqualsList("assertEqNormal",expectedNormal,result);
       
		}
	
})()

