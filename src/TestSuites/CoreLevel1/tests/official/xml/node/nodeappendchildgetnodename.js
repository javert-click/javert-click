
var docs = initDOMHeapCoreLevel1();
var jsUnitCore = initJsUnitCore();
var DOMTestCase = initDOMTestCase(jsUnitCore);   


/**
* 
    The "appendChild(newChild)" method returns the node
    added.
    
    Append a newly created node to the child list of the 
    second employee and check the NodeName returned.   The
    "getNodeName()" method should return "newChild".

* @author NIST
* @author Mary Brady
* @see http://www.w3.org/TR/1998/REC-DOM-Level-1-19981001/level-one-core#ID-F68D095
* @see http://www.w3.org/TR/1998/REC-DOM-Level-1-19981001/level-one-core#ID-184E7107
*/

     /*
     * @id nodeappendchildgetnodename
     */
     (function nodeappendchildgetnodename() {
   var success; 
    var doc;
      var elementList;
      var employeeNode;
      var childList;
      var newChild;
      var appendNode;
      var childName;
      
	   
	   
	doc = docs["staff.xml"]
           elementList = doc.getElementsByTagName("employee");
      employeeNode = elementList.item(1);
      childList = employeeNode.childNodes;

      newChild = doc.createElement("newChild");
      appendNode = employeeNode.appendChild(newChild);
      childName = appendNode.nodeName;

      jsUnitCore.assertEquals("nodeAppendChildGetNodeNameAssert1","newChild",childName);
       
})()

