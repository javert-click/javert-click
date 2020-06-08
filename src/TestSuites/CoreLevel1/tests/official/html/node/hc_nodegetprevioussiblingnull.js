
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


* @author Curt Arnold
* @see http://www.w3.org/TR/1998/REC-DOM-Level-1-19981001/level-one-core#ID-640FB3C8
*/

     /*
     * @id hc_nodegetprevioussiblingnull
     */
     (function hc_nodegetprevioussiblingnull() {
   var success; 
    var doc;
      var elementList;
      var employeeNode;
      var fcNode;
      var psNode;
      
	   
	   
	doc = docs["hc_staff.html"]
           elementList = doc.getElementsByTagName("p");
      employeeNode = elementList.item(2);
      fcNode = employeeNode.firstChild;

      psNode = fcNode.previousSibling;

      jsUnitCore.assertNull("nodeGetPreviousSiblingNullAssert1",psNode);
    
})()

