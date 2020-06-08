
var docs = initDOMHeapCoreLevel1();
var jsUnitCore = initJsUnitCore();
var DOMTestCase = initDOMTestCase(jsUnitCore);   


/**
* 
    The "removeChild(oldChild)" method returns 
    the node being removed.
    
    Remove the first child of the second employee 
    and check the NodeName returned by the 
    "removeChild(oldChild)" method.   The returned node
    should have a NodeName equal to "#text".

* @author Curt Arnold
* @see http://www.w3.org/TR/1998/REC-DOM-Level-1-19981001/level-one-core#ID-F68D095
* @see http://www.w3.org/TR/1998/REC-DOM-Level-1-19981001/level-one-core#ID-1734834066
* @see http://www.w3.org/Bugs/Public/show_bug.cgi?id=246
*/

     /*
     * @id hc_noderemovechildgetnodename
     */
     (function hc_noderemovechildgetnodename() {
   var success; 
    var doc;
      var elementList;
      var employeeNode;
      var childList;
      var oldChild;
      var removedChild;
      var childName;
      var oldName;
      
	   
	   
	doc = docs["hc_staff.html"]
           elementList = doc.getElementsByTagName("p");
      employeeNode = elementList.item(1);
      childList = employeeNode.childNodes;

      oldChild = childList.item(0);
      oldName = oldChild.nodeName;

      removedChild = employeeNode.removeChild(oldChild);
      jsUnitCore.assertNotNull("notnull",removedChild);
childName = removedChild.nodeName;

      jsUnitCore.assertEquals("nodeName",oldName,childName);
       
})()

