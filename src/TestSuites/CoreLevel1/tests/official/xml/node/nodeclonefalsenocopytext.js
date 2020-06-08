
var docs = initDOMHeapCoreLevel1();
var jsUnitCore = initJsUnitCore();
var DOMTestCase = initDOMTestCase(jsUnitCore);   


/**
* 
    The "cloneNode(deep)" method does not copy text unless it
    is deep cloned.(Test for deep=false)
    
    Retrieve the fourth child of the second employee and
    the "cloneNode(deep)" method with deep=false.   The
    duplicate node returned by the method should not copy
    any text data contained in this node.

* @author NIST
* @author Mary Brady
* @see http://www.w3.org/TR/1998/REC-DOM-Level-1-19981001/level-one-core#ID-3A0ED0A4
*/

     /*
     * @id nodeclonefalsenocopytext
     */
     (function nodeclonefalsenocopytext() {
   var success; 
    var doc;
      var elementList;
      var employeeNode;
      var childList;
      var childNode;
      var clonedNode;
      var lastChildNode;
      
	   
	   
	doc = docs["staff.xml"]
           elementList = doc.getElementsByTagName("employee");
      employeeNode = elementList.item(1);
      childList = employeeNode.childNodes;

      childNode = childList.item(3);
      clonedNode = childNode.cloneNode(false);
      lastChildNode = clonedNode.lastChild;

      jsUnitCore.assertNull("noTextNodes",lastChildNode);
    
})()

