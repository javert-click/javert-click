
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

* @author Curt Arnold
* @see http://www.w3.org/TR/1998/REC-DOM-Level-1-19981001/level-one-core#ID-785887307
* @see http://www.w3.org/Bugs/Public/show_bug.cgi?id=247
*/

     /*
     * @id hc_nodereplacechild
     */
     (function hc_nodereplacechild() {
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
      
	   
	   
	doc = docs["hc_staff.html"]
           elementList = doc.getElementsByTagName("p");
      employeeNode = elementList.item(1);
      childList = employeeNode.childNodes;

      oldChild = childList.item(0);
      newChild = doc.createElement("br");
      replacedNode = employeeNode.replaceChild(newChild,oldChild);
      child = childList.item(0);
      childName = child.nodeName;

      DOMTestCase.assertEqualsAutoCase("element", "nodeName","br",childName);
       
})()

