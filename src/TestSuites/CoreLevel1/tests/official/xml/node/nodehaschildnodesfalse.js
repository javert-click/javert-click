
var docs = initDOMHeapCoreLevel1();
var jsUnitCore = initJsUnitCore();
var DOMTestCase = initDOMTestCase(jsUnitCore);   


/**
* 
    The "hasChildNodes()" method returns false if the node
    does not have any children.
    
    Retrieve the Text node inside the first child of the 
    second employee and invoke the "hasChildNodes()" method.
    It should return the boolean value "false".

* @author NIST
* @author Mary Brady
* @see http://www.w3.org/TR/1998/REC-DOM-Level-1-19981001/level-one-core#ID-1451460987
* @see http://www.w3.org/TR/1998/REC-DOM-Level-1-19981001/level-one-core#ID-810594187
*/

     /*
     * @id nodehaschildnodesfalse
     */
     (function nodehaschildnodesfalse() {
   var success; 
    var doc;
      var elementList;
      var child;
      var employeeIdList;
      var employeeNode;
      var textNode;
      var state;
      
	   
	   
	doc = docs["staff.xml"]
           elementList = doc.getElementsByTagName("employee");
      child = elementList.item(1);
      employeeIdList = child.childNodes;

      employeeNode = employeeIdList.item(1);
      textNode = employeeNode.firstChild;

      state = textNode.hasChildNodes();
      jsUnitCore.assertFalse("nodeHasChildFalseAssert1",state);

})()

