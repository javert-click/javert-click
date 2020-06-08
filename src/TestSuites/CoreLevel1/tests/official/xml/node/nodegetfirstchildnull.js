
var docs = initDOMHeapCoreLevel1();
var jsUnitCore = initJsUnitCore();
var DOMTestCase = initDOMTestCase(jsUnitCore);   


/**
* 

    If there is not a first child then the "getFirstChild()"

    method returns null.

    

    Retrieve the Text node form the second child of the first

    employee and invoke the "getFirstChild()" method.   It

    should return null.


* @author NIST
* @author Mary Brady
* @see http://www.w3.org/TR/1998/REC-DOM-Level-1-19981001/level-one-core#ID-169727388
*/

     /*
     * @id nodegetfirstchildnull
     */
     (function nodegetfirstchildnull() {
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

      noChildNode = textNode.firstChild;

      jsUnitCore.assertNull("nodeGetFirstChildNullAssert1",noChildNode);
    
})()

