
var docs = initDOMHeapCoreLevel1();
var jsUnitCore = initJsUnitCore();
var DOMTestCase = initDOMTestCase(jsUnitCore);   


/**
* 
Collect the element names from Node.childNodes and check against expectations.

* @author NIST
* @author Mary Brady
* @see http://www.w3.org/TR/1998/REC-DOM-Level-1-19981001/level-one-core#ID-1451460987
*/

     /*
     * @id nodechildnodes
     */
     (function nodechildnodes() {
   var success; 
    var doc;
      var elementList;
      var employeeNode;
      var childNodes;
      var childNode;
      var childType;
      var childName;
      var elementNames = new Array();

      var expectedElementNames = new Array();
      expectedElementNames[0] = "employeeId";
      expectedElementNames[1] = "name";
      expectedElementNames[2] = "position";
      expectedElementNames[3] = "salary";
      expectedElementNames[4] = "gender";
      expectedElementNames[5] = "address";

      
	   
	   
	doc = docs["staff.xml"]
           elementList = doc.getElementsByTagName("employee");
      employeeNode = elementList.item(1);
      childNodes = employeeNode.childNodes;

      for(var indexN65644 = 0;indexN65644 < childNodes.length; indexN65644++) {
      childNode = childNodes.item(indexN65644);
      childType = childNode.nodeType;

      
	if(
	(1 == childType)
	) {
	childName = childNode.nodeName;

      elementNames[elementNames.length] = childName;

	}
	
	}
   DOMTestCase.assertEqualsList("elementNames",expectedElementNames,elementNames);
       
})()

