
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

* @author NIST
* @author Mary Brady
* @see http://www.w3.org/TR/1998/REC-DOM-Level-1-19981001/level-one-core#ID-1734834066
*/

     /*
     * @id noderemovechild
     */
     (function noderemovechild() {
   var success; 
    var doc;
      var rootNode;
      var childList;
      var childToRemove;
      var removedChild;
      var parentNode;
      
	   
	   
	doc = docs["staff.xml"]
           rootNode = doc.documentElement;

      childList = rootNode.childNodes;

      childToRemove = childList.item(1);
      removedChild = rootNode.removeChild(childToRemove);
      parentNode = removedChild.parentNode;

      jsUnitCore.assertNull("nodeRemoveChildAssert1",parentNode);
    
})()

