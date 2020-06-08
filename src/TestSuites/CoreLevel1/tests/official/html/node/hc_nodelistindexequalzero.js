
var docs = initDOMHeapCoreLevel1();
var jsUnitCore = initJsUnitCore();
var DOMTestCase = initDOMTestCase(jsUnitCore);   


/**
* 
   Create a list of all the children elements of the third
   employee and access its first child by using an index
   of 0.  This should result in the whitspace before "em" being
   selected (em when ignoring whitespace).  
   Further we evaluate its content(by using
   the "getNodeName()" method) to ensure the proper
   element was accessed.

* @author Curt Arnold
* @see http://www.w3.org/TR/1998/REC-DOM-Level-1-19981001/level-one-core#ID-844377136
* @see http://www.w3.org/Bugs/Public/show_bug.cgi?id=246
*/

     /*
     * @id hc_nodelistindexequalzero
     */
     (function hc_nodelistindexequalzero() {
   var success; 
    var doc;
      var elementList;
      var employeeNode;
      var employeeList;
      var child;
      var childName;
      var length;
      
	   
	   
	doc = docs["hc_staff.html"]
           elementList = doc.getElementsByTagName("p");
      employeeNode = elementList.item(2);
      employeeList = employeeNode.childNodes;

      length = employeeList.length;

      child = employeeList.item(0);
      childName = child.nodeName;

      
	if(
	(13 == length)
	) {
	jsUnitCore.assertEquals("childName_w_whitespace","#text",childName);
       
	}
	
		else {
			DOMTestCase.assertEqualsAutoCase("element", "childName_wo_whitespace","em",childName);
       
		}
	
})()

