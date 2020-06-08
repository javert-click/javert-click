
var docs = initDOMHeapCoreLevel1();
var jsUnitCore = initJsUnitCore();
var DOMTestCase = initDOMTestCase(jsUnitCore);   


/**
* 
    The "replaceChild(newChild,oldChild)" method returns 
    the node being replaced.
    
    Replace the second Element of the second employee with
    a newly created node Element and check the NodeName 
    returned by the "replaceChild(newChild,oldChild)"
    method.   The returned node should have a NodeName equal
    to "em".

* @author Curt Arnold
* @see http://www.w3.org/TR/1998/REC-DOM-Level-1-19981001/level-one-core#ID-F68D095
* @see http://www.w3.org/TR/1998/REC-DOM-Level-1-19981001/level-one-core#ID-785887307
* @see http://www.w3.org/Bugs/Public/show_bug.cgi?id=247
*/

     /*
     * @id hc_nodereplacechildnodename
     */
     (function hc_nodereplacechildnodename() {
   var success; 
    var doc;
      var elementList;
      var employeeNode;
      var childList;
      var oldChild;
      var newChild;
      var replacedNode;
      var childName;
      
	   
	   
	doc = docs["hc_staff.html"]
           elementList = doc.getElementsByTagName("p");
      employeeNode = elementList.item(1);
      childList = employeeNode.getElementsByTagName("em");
      oldChild = childList.item(0);
      newChild = doc.createElement("br");
      replacedNode = employeeNode.replaceChild(newChild,oldChild);
      childName = replacedNode.nodeName;

      DOMTestCase.assertEqualsAutoCase("element", "replacedNodeName","em",childName);
       
})()

