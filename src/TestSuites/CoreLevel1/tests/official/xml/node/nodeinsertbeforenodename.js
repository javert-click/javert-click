
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

* @author NIST
* @author Mary Brady
* @see http://www.w3.org/TR/1998/REC-DOM-Level-1-19981001/level-one-core#ID-F68D095
* @see http://www.w3.org/TR/1998/REC-DOM-Level-1-19981001/level-one-core#ID-952280727
*/

     /*
     * @id nodeinsertbeforenodename
     */
     (function nodeinsertbeforenodename() {
   var success; 
    var doc;
      var elementList;
      var employeeNode;
      var childList;
      var refChild;
      var newChild;
      var insertedNode;
      var childName;
      
	   
	   
	doc = docs["staff.xml"]
           elementList = doc.getElementsByTagName("employee");
      employeeNode = elementList.item(1);
      childList = employeeNode.childNodes;

      refChild = childList.item(3);
      newChild = doc.createElement("newChild");
      insertedNode = employeeNode.insertBefore(newChild,refChild);
      childName = insertedNode.nodeName;

      jsUnitCore.assertEquals("nodeInsertBeforeNodeNameAssert1","newChild",childName);
       
})()

