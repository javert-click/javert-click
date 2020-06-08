
var docs = initDOMHeapCoreLevel1();
var jsUnitCore = initJsUnitCore();
var DOMTestCase = initDOMTestCase(jsUnitCore);   


/**
* 
    The "replaceChild(newChild,oldChild)" method replaces 
    the node "oldChild" with the node "newChild". 
    
    Replace the first element of the second employee with
    a newly created Element node.   Check the first position
    after the replacement operation is completed.   The new
    Element should be "newChild".

* @author NIST
* @author Mary Brady
* @see http://www.w3.org/TR/1998/REC-DOM-Level-1-19981001/level-one-core#ID-785887307
*/

     /*
     * @id nodereplacechild
     */
     (function nodereplacechild() {
   var success; 
    var doc;
      var elementList;
      var employeeNode;
      var childList;
      var oldChild;
      var newChild;
      var child;
      var childName;
      var replacedNode;
      
	   
	   
	doc = docs["staff.xml"]
           elementList = doc.getElementsByTagName("employee");
      employeeNode = elementList.item(1);
      childList = employeeNode.childNodes;

      oldChild = childList.item(0);
      newChild = doc.createElement("newChild");
      replacedNode = employeeNode.replaceChild(newChild,oldChild);
      child = childList.item(0);
      childName = child.nodeName;

      jsUnitCore.assertEquals("nodeReplaceChildAssert1","newChild",childName);
       
})()

