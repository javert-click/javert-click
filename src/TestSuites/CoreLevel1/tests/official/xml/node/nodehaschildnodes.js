
var docs = initDOMHeapCoreLevel1();
var jsUnitCore = initJsUnitCore();
var DOMTestCase = initDOMTestCase(jsUnitCore);   


/**
* 
    The "hasChildNodes()" method returns true if the node
    has children.
    
    Retrieve the root node("staff") and invoke the 
    "hasChildNodes()" method.   It should return the boolean
    value "true".

* @author NIST
* @author Mary Brady
* @see http://www.w3.org/TR/1998/REC-DOM-Level-1-19981001/level-one-core#ID-810594187
*/

     /*
     * @id nodehaschildnodes
     */
     (function nodehaschildnodes() {
   var success; 
    var doc;
      var elementList;
      var employeeNode;
      var state;
      
	   
	   
	doc = docs["staff.xml"]
           elementList = doc.getElementsByTagName("employee");
      employeeNode = elementList.item(1);
      state = employeeNode.hasChildNodes();
      jsUnitCore.assertTrue("nodeHasChildAssert1",state);

})()

