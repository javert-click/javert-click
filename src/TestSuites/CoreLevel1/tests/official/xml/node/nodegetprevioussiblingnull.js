
var docs = initDOMHeapCoreLevel1();
var jsUnitCore = initJsUnitCore();
var DOMTestCase = initDOMTestCase(jsUnitCore);   


/**
* 

    If there is not a node immediately preceding this node the

    "getPreviousSibling()" method returns null.

    

    Retrieve the first child of the second employee and

    invoke the "getPreviousSibling()" method.   It should

    be set to null. 


* @author NIST
* @author Mary Brady
* @see http://www.w3.org/TR/1998/REC-DOM-Level-1-19981001/level-one-core#ID-640FB3C8
*/

     /*
     * @id nodegetprevioussiblingnull
     */
     (function nodegetprevioussiblingnull() {
   var success; 
    var doc;
      var elementList;
      var employeeNode;
      var fcNode;
      var psNode;
      
	   
	   
	doc = docs["staff.xml"]
           elementList = doc.getElementsByTagName("employee");
      employeeNode = elementList.item(2);
      fcNode = employeeNode.firstChild;

      psNode = fcNode.previousSibling;

      jsUnitCore.assertNull("nodeGetPreviousSiblingNullAssert1",psNode);
    
})()

