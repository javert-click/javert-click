
var docs = initDOMHeapCoreLevel1();
var jsUnitCore = initJsUnitCore();
var DOMTestCase = initDOMTestCase(jsUnitCore);   


/**
* 

    If there is not a node immediately following this node the

    "getNextSibling()" method returns null.

    

    Retrieve the first child of the second employee and

    invoke the "getNextSibling()" method.   It should

    be set to null. 


* @author NIST
* @author Mary Brady
* @see http://www.w3.org/TR/1998/REC-DOM-Level-1-19981001/level-one-core#ID-6AC54C2F
*/

     /*
     * @id nodegetnextsiblingnull
     */
     (function nodegetnextsiblingnull() {
   var success; 
    var doc;
      var elementList;
      var employeeNode;
      var lcNode;
      var nsNode;
      
	   
	   
	doc = docs["staff.xml"]
           elementList = doc.getElementsByTagName("employee");
      employeeNode = elementList.item(1);
      lcNode = employeeNode.lastChild;

      nsNode = lcNode.nextSibling;

      jsUnitCore.assertNull("nodeGetNextSiblingNullAssert1",nsNode);
    
})()

