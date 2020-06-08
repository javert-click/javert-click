
var docs = initDOMHeapCoreLevel1();
var jsUnitCore = initJsUnitCore();
var DOMTestCase = initDOMTestCase(jsUnitCore);   


/**
* 
   Create a list of all the children elements of the third
   employee and access its fourth child by using an index
   of 3.  This should result in "name" being
   selected.  Further we evaluate its content(by using
   the "getNodeName()" method) to ensure the proper
   element was accessed.

* @author NIST
* @author Mary Brady
* @see http://www.w3.org/TR/1998/REC-DOM-Level-1-19981001/level-one-core#ID-844377136
*/

     /*
     * @id nodelistindexnotzero
     */
     (function nodelistindexnotzero() {
   var success; 
    var doc;
      var elementList;
      var employeeNode;
      var employeeList;
      var child;
      var length;
      var childName;
      
	   
	   
	doc = docs["staff.xml"]
           elementList = doc.getElementsByTagName("employee");
      employeeNode = elementList.item(2);
      employeeList = employeeNode.childNodes;

      length = employeeList.length;

      
	if(
	(6 == length)
	) {
	child = employeeList.item(1);
      
	}
	
		else {
			child = employeeList.item(3);
      
		}
	childName = child.nodeName;

      jsUnitCore.assertEquals("nodeName","name",childName);
       
})()

