
var docs = initDOMHeapCoreLevel1();
var jsUnitCore = initJsUnitCore();
var DOMTestCase = initDOMTestCase(jsUnitCore);   


/**
* 
Element.getElementsByTagName("employee") should return a NodeList whose length is
"5" in the order the children were encountered.

* @author NIST
* @author Mary Brady
* @see http://www.w3.org/TR/1998/REC-DOM-Level-1-19981001/level-one-core#ID-1938918D
*/

     /*
     * @id elementgetelementsbytagnameaccessnodelist
     */
     (function elementgetelementsbytagnameaccessnodelist() {
   var success; 
    var doc;
      var elementList;
      var testEmployee;
      var child;
      var childName;
      var childValue;
      var childType;
      
	   
	   
	doc = docs["staff.xml"]
           elementList = doc.getElementsByTagName("employee");
      testEmployee = elementList.item(3);
      child = testEmployee.firstChild;

      childType = child.nodeType;

      
	if(
	(3 == childType)
	) {
	child = child.nextSibling;

      
	}
	childName = child.nodeName;

      jsUnitCore.assertEquals("nodename","employeeId",childName);
       child = child.firstChild;

      childValue = child.nodeValue;

      jsUnitCore.assertEquals("emp0004","EMP0004",childValue);
       
})()

