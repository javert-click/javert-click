
var docs = initDOMHeapCoreLevel1();
var jsUnitCore = initJsUnitCore();
var DOMTestCase = initDOMTestCase(jsUnitCore);   


/**
* 
    The "getLength()" method returns the number of nodes
   in the list.(Test for EMPTY list)
   
   Create a list of all the children of the Text node 
   inside the first child of the third employee and
   invoke the "getLength()" method.   It should contain
   the value 0.

* @author NIST
* @author Mary Brady
* @see http://www.w3.org/TR/1998/REC-DOM-Level-1-19981001/level-one-core#ID-203510337
*/

     /*
     * @id nodelistindexgetlengthofemptylist
     */
     (function nodelistindexgetlengthofemptylist() {
   var success; 
    var doc;
      var elementList;
      var employeeNode;
      var employeeList;
      var childNode;
      var textNode;
      var textList;
      
	   
	   
	doc = docs["staff.xml"]
           elementList = doc.getElementsByTagName("employee");
      employeeNode = elementList.item(2);
      employeeList = employeeNode.childNodes;

      childNode = employeeList.item(1);
      textNode = childNode.firstChild;

      textList = textNode.childNodes;

      DOMTestCase.assertSize("nodelistIndexGetLengthOfEmptyListAssert",0,textList);

})()

