
var docs = initDOMHeapCoreLevel1();
var jsUnitCore = initJsUnitCore();
var DOMTestCase = initDOMTestCase(jsUnitCore);   


/**
* 
   Create a list of all the children elements of the third
   employee and access its first child by invoking the 
   "item(index)" method with an index=0.  This should
   result in node with a nodeName of "#text" or "em".

* @author Curt Arnold
* @see http://www.w3.org/TR/1998/REC-DOM-Level-1-19981001/level-one-core#ID-844377136
* @see http://www.w3.org/Bugs/Public/show_bug.cgi?id=246
*/

     /*
     * @id hc_nodelistreturnfirstitem
     */
     (function hc_nodelistreturnfirstitem() {
   var success; 
    var doc;
      var elementList;
      var employeeNode;
      var employeeList;
      var child;
      var childName;
      
	   
	   
	doc = docs["hc_staff.html"]
           elementList = doc.getElementsByTagName("p");
      employeeNode = elementList.item(2);
      employeeList = employeeNode.childNodes;

      child = employeeList.item(0);
      childName = child.nodeName;

      
	if(
	("#text" == childName)
	) {
	jsUnitCore.assertEquals("nodeName_w_space","#text",childName);
       
	}
	
		else {
			DOMTestCase.assertEqualsAutoCase("element", "nodeName_wo_space","em",childName);
       
		}
	
})()

