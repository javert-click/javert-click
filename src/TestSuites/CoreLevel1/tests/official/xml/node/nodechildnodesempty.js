
var docs = initDOMHeapCoreLevel1();
var jsUnitCore = initJsUnitCore();
var DOMTestCase = initDOMTestCase(jsUnitCore);   


/**
* 
    The "getChildNodes()" method returns a NodeList
    that contains all children of this node.   If there
    are not any children, this is a NodeList that does not 
    contain any nodes. 

    Retrieve the Text node from the second child of the second
    employee and invoke the "getChildNodes()" method.   The
    NodeList returned should not have any nodes.

* @author NIST
* @author Mary Brady
* @see http://www.w3.org/TR/1998/REC-DOM-Level-1-19981001/level-one-core#ID-1451460987
*/

     /*
     * @id nodechildnodesempty
     */
     (function nodechildnodesempty() {
   var success; 
    var doc;
      var elementList;
      var employeeNode;
      var childList;
      var secondCNode;
      var textNode;
      var childNodesList;
      
	   
	   
	doc = docs["staff.xml"]
           elementList = doc.getElementsByTagName("employee");
      employeeNode = elementList.item(1);
      childList = employeeNode.childNodes;

      secondCNode = childList.item(1);
      textNode = secondCNode.firstChild;

      childNodesList = textNode.childNodes;

      DOMTestCase.assertSize("nodeChildNodesEmptyAssert1",0,childNodesList);

})()

