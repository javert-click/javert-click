
var docs = initDOMHeapCoreLevel1();
var jsUnitCore = initJsUnitCore();
var DOMTestCase = initDOMTestCase(jsUnitCore);   


/**
* 
   Create a list of all the children elements of the third
   employee and access its last child by invoking the 
   "item(index)" method with an index=length-1.  This should
   result in node with nodeName="#text" or acronym.
* @author Curt Arnold
* @see http://www.w3.org/TR/1998/REC-DOM-Level-1-19981001/level-one-core#ID-844377136
* @see http://www.w3.org/Bugs/Public/show_bug.cgi?id=246
*/

     /*
     * @id hc_nodelistreturnlastitem
     */
     (function hc_nodelistreturnlastitem() {
   var success; 
    var doc;
      var elementList;
      var employeeNode;
      var employeeList;
      var child;
      var childName;
      var index;
      
	   
	   
	doc = docs["hc_staff.html"]
           elementList = doc.getElementsByTagName("p");
      employeeNode = elementList.item(2);
      employeeList = employeeNode.childNodes;

      index = employeeList.length;

      index -= 1;
child = employeeList.item(index);
      childName = child.nodeName;

      
	if(
	(12 == index)
	) {
	jsUnitCore.assertEquals("lastNodeName_w_whitespace","#text",childName);
       
	}
	
		else {
			DOMTestCase.assertEqualsAutoCase("element", "lastNodeName","acronym",childName);
       jsUnitCore.assertEquals("index",5,index);
       
		}
	
})()

