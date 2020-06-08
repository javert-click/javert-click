
var docs = initDOMHeapCoreLevel1();
var jsUnitCore = initJsUnitCore();
var DOMTestCase = initDOMTestCase(jsUnitCore);   


/**
* 
    The "removeChild(oldChild)" method removes the child node
    indicated by "oldChild" from the list of children and
    returns it. 
    
    Remove the first employee by invoking the
    "removeChild(oldChild)" method an checking the
    node returned by the "getParentNode()" method.   It
    should be set to null.

* @author Curt Arnold
* @see http://www.w3.org/TR/1998/REC-DOM-Level-1-19981001/level-one-core#ID-1734834066
* @see http://www.w3.org/Bugs/Public/show_bug.cgi?id=249
*/

     /*
     * @id hc_noderemovechild
     */
     (function hc_noderemovechild() {
   var success; 
    var doc;
      var rootNode;
      var childList;
      var childToRemove;
      var removedChild;
      var parentNode;
      
	   
	   
	doc = docs["hc_staff.html"]
           rootNode = doc.documentElement;

      childList = rootNode.childNodes;

      childToRemove = childList.item(1);
      removedChild = rootNode.removeChild(childToRemove);
      parentNode = removedChild.parentNode;

      jsUnitCore.assertNull("parentNodeNull",parentNode);
    
})()

