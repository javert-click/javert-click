
var docs = initDOMHeapCoreLevel1();
var jsUnitCore = initJsUnitCore();
var DOMTestCase = initDOMTestCase(jsUnitCore);   


/**
* 
    Retrieve the second "p" and append a "br" Element
    node to the list of children.   The last node in the list
    is then retrieved and its NodeName examined.   The
    "getNodeName()" method should return "br".

* @author Curt Arnold
* @see http://www.w3.org/TR/1998/REC-DOM-Level-1-19981001/level-one-core#ID-184E7107
* @see http://www.w3.org/Bugs/Public/show_bug.cgi?id=247
*/

     /*
     * @id hc_nodeappendchild
     */
     (function hc_nodeappendchild() {
   var success; 
    var doc;
      var elementList;
      var employeeNode;
      var childList;
      var createdNode;
      var lchild;
      var childName;
      var appendedChild;
      
	   
	   
	doc = docs["hc_staff.html"]
           elementList = doc.getElementsByTagName("p");
      employeeNode = elementList.item(1);
      childList = employeeNode.childNodes;

      createdNode = doc.createElement("br");
      appendedChild = employeeNode.appendChild(createdNode);
      lchild = employeeNode.lastChild;

      childName = lchild.nodeName;

      DOMTestCase.assertEqualsAutoCase("element", "nodeName","br",childName);
       
})()

