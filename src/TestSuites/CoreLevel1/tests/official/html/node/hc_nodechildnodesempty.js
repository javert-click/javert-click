
var docs = initDOMHeapCoreLevel1();
var jsUnitCore = initJsUnitCore();
var DOMTestCase = initDOMTestCase(jsUnitCore);   


/**
* 
    The "getChildNodes()" method returns a NodeList
    that contains all children of this node.   If there
    are not any children, this is a NodeList that does not 
    contain any nodes. 

    Retrieve the character data of the second "em" node and
    invoke the "getChildNodes()" method.   The
    NodeList returned should not have any nodes.

* @author Curt Arnold
* @see http://www.w3.org/TR/1998/REC-DOM-Level-1-19981001/level-one-core#ID-1451460987
* @see http://www.w3.org/Bugs/Public/show_bug.cgi?id=246
*/

     /*
     * @id hc_nodechildnodesempty
     */
     (function hc_nodechildnodesempty() {
   var success; 
    var doc;
      var elementList;
      var childList;
      var employeeNode;
      var textNode;
      var length;
      
	   
	   
	doc = docs["hc_staff.html"]
           elementList = doc.getElementsByTagName("em");
      employeeNode = elementList.item(1);
      textNode = employeeNode.firstChild;

      childList = textNode.childNodes;

      length = childList.length;

      jsUnitCore.assertEquals("length_zero",0,length);
       
})()

