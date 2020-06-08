
var docs = initDOMHeapCoreLevel1();
var jsUnitCore = initJsUnitCore();
var DOMTestCase = initDOMTestCase(jsUnitCore);   


/**
* 
    The "getLength()" method returns the number of nodes
   in the list should be 6 (no whitespace) or 13.

* @author NIST
* @author Mary Brady
* @see http://www.w3.org/TR/1998/REC-DOM-Level-1-19981001/level-one-core#ID-203510337
*/

     /*
     * @id nodelistindexgetlength
     */
     (function nodelistindexgetlength() {
   var success; 
    var doc;
      var elementList;
      var employeeNode;
      var employeeList;
      var length;
      var expectedCount = 0;
      
	   
	   
	doc = docs["staff.xml"]
           elementList = doc.getElementsByTagName("employee");
      employeeNode = elementList.item(2);
      employeeList = employeeNode.childNodes;

      length = employeeList.length;

      	jsUnitCore.assertTrue("lengthIs6or13",
      
	((6 == length) || (13 == length))
);

})()

