
var docs = initDOMHeapCoreLevel1();
var jsUnitCore = initJsUnitCore();
var DOMTestCase = initDOMTestCase(jsUnitCore);   


/**
* 
    
    The "getChildNodes()" method returns a NodeList
    that contains all children of this node. 
    
    Retrieve the second employee and check the NodeList
    returned by the "getChildNodes()" method.   The
    length of the list should be 13.

* @author Curt Arnold
* @see http://www.w3.org/TR/1998/REC-DOM-Level-1-19981001/level-one-core#ID-1451460987
* @see http://www.w3.org/Bugs/Public/show_bug.cgi?id=246
*/

     /*
     * @id hc_nodechildnodes
     */
     (function hc_nodechildnodes() {
   var success; 
    var doc;
      var elementList;
      var employeeNode;
      var childNode;
      var childNodes;
      var nodeType;
      var childName;
      var actual = new Array();

      var expected = new Array();
      expected[0] = "em";
      expected[1] = "strong";
      expected[2] = "code";
      expected[3] = "sup";
      expected[4] = "var";
      expected[5] = "acronym";

      
	   
	   
	doc = docs["hc_staff.html"]
           elementList = doc.getElementsByTagName("p");
      employeeNode = elementList.item(1);
      childNodes = employeeNode.childNodes;

      for(var indexN65644 = 0;indexN65644 < childNodes.length; indexN65644++) {
      childNode = childNodes.item(indexN65644);
      nodeType = childNode.nodeType;

      childName = childNode.nodeName;

      
	if(
	(1 == nodeType)
	) {
	actual[actual.length] = childName;

	}
	
		else {
			jsUnitCore.assertEquals("textNodeType",3,nodeType);
       
		}
	
	}
   DOMTestCase.assertEqualsListAutoCase("element", "elementNames",expected,actual);
       
})()

