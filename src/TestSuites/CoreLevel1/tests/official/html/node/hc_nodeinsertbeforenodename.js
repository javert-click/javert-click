
var docs = initDOMHeapCoreLevel1();
var jsUnitCore = initJsUnitCore();
var DOMTestCase = initDOMTestCase(jsUnitCore);   


/**
* 
    The "insertBefore(newChild,refchild)" method returns 
    the node being inserted.
    
    Insert an Element node before the fourth
    child of the second employee and check the node
    returned from the "insertBefore(newChild,refChild)" 
    method.   The node returned should be "newChild".

* @author Curt Arnold
* @see http://www.w3.org/TR/1998/REC-DOM-Level-1-19981001/level-one-core#ID-F68D095
* @see http://www.w3.org/TR/1998/REC-DOM-Level-1-19981001/level-one-core#ID-952280727
* @see http://www.w3.org/Bugs/Public/show_bug.cgi?id=247
*/

     /*
     * @id hc_nodeinsertbeforenodename
     */
     (function hc_nodeinsertbeforenodename() {
   var success; 
    var doc;
      var elementList;
      var employeeNode;
      var childList;
      var refChild;
      var newChild;
      var insertedNode;
      var childName;
      
	   
	   
	doc = docs["hc_staff.html"]
           elementList = doc.getElementsByTagName("p");
      employeeNode = elementList.item(1);
      childList = employeeNode.childNodes;

      refChild = childList.item(3);
      newChild = doc.createElement("br");
      insertedNode = employeeNode.insertBefore(newChild,refChild);
      childName = insertedNode.nodeName;

      DOMTestCase.assertEqualsAutoCase("element", "nodeName","br",childName);
       
})()

