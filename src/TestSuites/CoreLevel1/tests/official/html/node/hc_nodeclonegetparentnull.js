
var docs = initDOMHeapCoreLevel1();
var jsUnitCore = initJsUnitCore();
var DOMTestCase = initDOMTestCase(jsUnitCore);   


/**
* 
    The duplicate node returned by the "cloneNode(deep)"
    method does not have a ParentNode.
    
    Retrieve the second employee and invoke the
    "cloneNode(deep)" method with deep=false.   The
    duplicate node returned should return null when the
    "getParentNode()" is invoked.

* @author Curt Arnold
* @see http://www.w3.org/TR/1998/REC-DOM-Level-1-19981001/level-one-core#ID-3A0ED0A4
*/

     /*
     * @id hc_nodeclonegetparentnull
     */
     (function hc_nodeclonegetparentnull() {
   var success; 
    var doc;
      var elementList;
      var employeeNode;
      var clonedNode;
      var parentNode;
      
	   
	   
	doc = docs["hc_staff.html"]
           elementList = doc.getElementsByTagName("p");
      employeeNode = elementList.item(1);
      clonedNode = employeeNode.cloneNode(false);
      parentNode = clonedNode.parentNode;

      jsUnitCore.assertNull("nodeCloneGetParentNullAssert1",parentNode);
    
})()

