
var docs = initDOMHeapCoreLevel1();
var jsUnitCore = initJsUnitCore();
var DOMTestCase = initDOMTestCase(jsUnitCore);   


/**
* 
    The "appendChild(newChild)" method adds the node
    "newChild" to the end of the list of children of the
    node.
    
    Retrieve the second employee and append a new Element
    node to the list of children.   The last node in the list
    is then retrieved and its NodeName examined.   The
    "getNodeName()" method should return "newChild".

* @author NIST
* @author Mary Brady
* @see http://www.w3.org/TR/1998/REC-DOM-Level-1-19981001/level-one-core#ID-184E7107
*/

     /*
     * @id nodeappendchild
     */
     (function nodeappendchild() {
   var success; 
    var doc;
      var elementList;
      var employeeNode;
      var childList;
      var createdNode;
      var lchild;
      var childName;
      var appendedChild;
      
	   
	   
	doc = docs["staff.xml"]
           elementList = doc.getElementsByTagName("employee");
      employeeNode = elementList.item(1);
      childList = employeeNode.childNodes;

      createdNode = doc.createElement("newChild");
      appendedChild = employeeNode.appendChild(createdNode);
      lchild = employeeNode.lastChild;

      childName = lchild.nodeName;

      jsUnitCore.assertEquals("nodeAppendChildAssert1","newChild",childName);
       
})()

