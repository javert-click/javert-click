
var docs = initDOMHeapCoreLevel1();
var jsUnitCore = initJsUnitCore();
var DOMTestCase = initDOMTestCase(jsUnitCore);   


/**
* 
    The range of valid child node indices is 0 thru length -1
   
   Create a list of all the children elements of the third
   employee and traverse the list from index=0 thru
   length -1.     

* @author Curt Arnold
* @see http://www.w3.org/TR/1998/REC-DOM-Level-1-19981001/level-one-core#ID-203510337
* @see http://www.w3.org/TR/1998/REC-DOM-Level-1-19981001/level-one-core#ID-844377136
* @see http://www.w3.org/Bugs/Public/show_bug.cgi?id=246
*/

     /*
     * @id hc_nodelisttraverselist
     */
     (function hc_nodelisttraverselist() {
   var success; 
    var doc;
      var elementList;
      var employeeNode;
      var employeeList;
      var child;
      var childName;
      var nodeType;
      var result = new Array();

      var expected = new Array();
      expected[0] = "em";
      expected[1] = "strong";
      expected[2] = "code";
      expected[3] = "sup";
      expected[4] = "var";
      expected[5] = "acronym";

      
	   
	   
	doc = docs["hc_staff.html"]
           elementList = doc.getElementsByTagName("p");
      employeeNode = elementList.item(2);
      employeeList = employeeNode.childNodes;

      for(var indexN65651 = 0;indexN65651 < employeeList.length; indexN65651++) {
      child = employeeList.item(indexN65651);
      nodeType = child.nodeType;

      childName = child.nodeName;

      
	if(
	(1 == nodeType)
	) {
	result[result.length] = childName;

	}
	
		else {
			jsUnitCore.assertEquals("textNodeType",3,nodeType);
       jsUnitCore.assertEquals("textNodeName","#text",childName);
       
		}
	
	}
   DOMTestCase.assertEqualsListAutoCase("element", "nodeNames",expected,result);
       
})()

