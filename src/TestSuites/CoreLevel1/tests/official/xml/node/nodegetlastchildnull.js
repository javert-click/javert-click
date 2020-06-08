
var docs = initDOMHeapCoreLevel1();
var jsUnitCore = initJsUnitCore();
var DOMTestCase = initDOMTestCase(jsUnitCore);   


/**
* 

    If there is not a last child then the "getLastChild()"

    method returns null.

    

    Retrieve the Text node from the second child of the first

    employee and invoke the "getLastChild()" method.   It

    should return null.


* @author NIST
* @author Mary Brady
* @see http://www.w3.org/TR/1998/REC-DOM-Level-1-19981001/level-one-core#ID-61AD09FB
*/

     /*
     * @id nodegetlastchildnull
     */
     (function nodegetlastchildnull() {
   var success; 
    var doc;
      var elementList;
      var employeeNode;
      var employeeList;
      var secondChildNode;
      var textNode;
      var noChildNode;
      
	   
	   
	doc = docs["staff.xml"]
           elementList = doc.getElementsByTagName("employee");
      employeeNode = elementList.item(0);
      employeeList = employeeNode.childNodes;

      secondChildNode = employeeList.item(1);
      textNode = secondChildNode.firstChild;

      noChildNode = textNode.lastChild;

      jsUnitCore.assertNull("nodeGetLastChildNullAssert1",noChildNode);
    
})()

