
var docs = initDOMHeapCoreLevel1();
var jsUnitCore = initJsUnitCore();
var DOMTestCase = initDOMTestCase(jsUnitCore);   


/**
* 
    The NodeList returned by the "getChildNodes()" method
    is live.   Changes on the node's children are immediately
    reflected on the nodes returned in the NodeList.
    
    Create a NodeList of the children of the second employee
    and then add a newly created element that was created
    by the "createElement()" method(Document Interface) to
    the second employee by using the "appendChild()" method.
    The length of the NodeList should reflect this new
    addition to the child list.   It should return the value 14.

* @author Curt Arnold
* @see http://www.w3.org/TR/1998/REC-DOM-Level-1-19981001/level-one-core#ID-1451460987
* @see http://www.w3.org/TR/1998/REC-DOM-Level-1-19981001/level-one-core#ID-184E7107
* @see http://www.w3.org/Bugs/Public/show_bug.cgi?id=246
* @see http://www.w3.org/Bugs/Public/show_bug.cgi?id=247
*/

     /*
     * @id hc_nodechildnodesappendchild
     */
     (function hc_nodechildnodesappendchild() {
   var success; 
    var doc;
      var elementList;
      var employeeNode;
      var childList;
      var createdNode;
      var childNode;
      var childName;
      var childType;
      var textNode;
      var actual = new Array();

      var expected = new Array();
      expected[0] = "em";
      expected[1] = "strong";
      expected[2] = "code";
      expected[3] = "sup";
      expected[4] = "var";
      expected[5] = "acronym";
      expected[6] = "br";

      
	   
	   
	doc = docs["hc_staff.html"]
           elementList = doc.getElementsByTagName("p");
      employeeNode = elementList.item(1);
      childList = employeeNode.childNodes;

      createdNode = doc.createElement("br");
      employeeNode = employeeNode.appendChild(createdNode);
      for(var indexN65671 = 0;indexN65671 < childList.length; indexN65671++) {
      childNode = childList.item(indexN65671);
      childName = childNode.nodeName;

      childType = childNode.nodeType;

      
	if(
	(1 == childType)
	) {
	actual[actual.length] = childName;

	}
	
		else {
			jsUnitCore.assertEquals("textNodeType",3,childType);
       
		}
	
	}
   DOMTestCase.assertEqualsListAutoCase("element", "childElements",expected,actual);
       
})()

