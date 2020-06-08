
var docs = initDOMHeapCoreLevel1();
var jsUnitCore = initJsUnitCore();
var DOMTestCase = initDOMTestCase(jsUnitCore);   


/**
* 
Get this last child of the third employee using NodeList.item(NodeList.length - 1)
and check that it is either a Text element (with whitespace) or an address element.

* @author NIST
* @author Mary Brady
* @see http://www.w3.org/TR/1998/REC-DOM-Level-1-19981001/level-one-core#ID-844377136
*/

     /*
     * @id nodelistreturnlastitem
     */
     (function nodelistreturnlastitem() {
   var success; 
    var doc;
      var elementList;
      var employeeNode;
      var employeeList;
      var child;
      var childName;
      var length;
      
	   
	   
	doc = docs["staff.xml"]
           elementList = doc.getElementsByTagName("employee");
      employeeNode = elementList.item(2);
      employeeList = employeeNode.childNodes;

      length = employeeList.length;

      
	if(
	(6 == length)
	) {
	child = employeeList.item(5);
      childName = child.nodeName;

      jsUnitCore.assertEquals("nodeName1","address",childName);
       
	}
	
		else {
			child = employeeList.item(12);
      childName = child.nodeName;

      jsUnitCore.assertEquals("nodeName2","#text",childName);
       
		}
	
})()

