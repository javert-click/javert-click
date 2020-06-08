
var docs = initDOMHeapCoreLevel1();
var jsUnitCore = initJsUnitCore();
var DOMTestCase = initDOMTestCase(jsUnitCore);   


/**
* 
The "getElementsByTagName(name)" method returns a list
of all descendant Elements in the order the children
were encountered in a pre order traversal of the element
tree.

Create a NodeList of all the descendant elements
using the string "p" as the tagName.
The method should return a NodeList whose length is
"5" in the order the children were encountered.
Access the FOURTH element in the NodeList.  The FOURTH
element, the first or second should be an "em" node with
the content "EMP0004".

* @author Curt Arnold
* @see http://www.w3.org/TR/1998/REC-DOM-Level-1-19981001/level-one-core#ID-1938918D
* @see http://www.w3.org/Bugs/Public/show_bug.cgi?id=246
*/

     /*
     * @id hc_elementgetelementsbytagnameaccessnodelist
     */
     (function hc_elementgetelementsbytagnameaccessnodelist() {
   var success; 
    var doc;
      var elementList;
      var testEmployee;
      var firstC;
      var childName;
      var nodeType;
      var employeeIDNode;
      var employeeID;
      
	   
	   
	doc = docs["hc_staff.html"]
           elementList = doc.getElementsByTagName("p");
      testEmployee = elementList.item(3);
      firstC = testEmployee.firstChild;

      nodeType = firstC.nodeType;

      
    while(
	(3 == nodeType)
	) {
	firstC = firstC.nextSibling;

      nodeType = firstC.nodeType;

      
	}
childName = firstC.nodeName;

      DOMTestCase.assertEqualsAutoCase("element", "childName","em",childName);
       employeeIDNode = firstC.firstChild;

      employeeID = employeeIDNode.nodeValue;

      jsUnitCore.assertEquals("employeeID","EMP0004",employeeID);
       
})()

