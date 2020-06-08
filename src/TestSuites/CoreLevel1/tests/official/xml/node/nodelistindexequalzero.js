
var docs = initDOMHeapCoreLevel1();
var jsUnitCore = initJsUnitCore();
var DOMTestCase = initDOMTestCase(jsUnitCore);   


/**
* 
   Create a list of all the children elements of the third
   employee and access its first child by using an index
   of 0.

* @author NIST
* @author Mary Brady
* @see http://www.w3.org/TR/1998/REC-DOM-Level-1-19981001/level-one-core#ID-844377136
*/

     /*
     * @id nodelistindexequalzero
     */
     (function nodelistindexequalzero() {
   var success; 
    var doc;
      var elementList;
      var employeeNode;
      var employeeList;
      var child;
      var childName;
      
	   
	   
	doc = docs["staff.xml"]
           elementList = doc.getElementsByTagName("employee");
      employeeNode = elementList.item(2);
      employeeList = employeeNode.childNodes;

      child = employeeList.item(0);
      childName = child.nodeName;

      
	if(
	!("#text" == childName)
	) {
	jsUnitCore.assertEquals("childName","employeeId",childName);
       
	}
	
})()

