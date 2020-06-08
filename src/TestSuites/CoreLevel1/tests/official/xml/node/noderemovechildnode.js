
var docs = initDOMHeapCoreLevel1();
var jsUnitCore = initJsUnitCore();
var DOMTestCase = initDOMTestCase(jsUnitCore);   


/**
* 
    Retrieve the second employee and remove its first child.
    After the removal, the second employee should have five or twelve 
    children and the first child should now be the child
    that used to be at the second position in the list.

* @author NIST
* @author Mary Brady
* @see http://www.w3.org/TR/1998/REC-DOM-Level-1-19981001/level-one-core#ID-1734834066
*/

     /*
     * @id noderemovechildnode
     */
     (function noderemovechildnode() {
   var success; 
    var doc;
      var elementList;
      var employeeNode;
      var childList;
      var oldChild;
      var child;
      var childName;
      var length;
      var removedChild;
      var removedName;
      
	   
	   
	doc = docs["staff.xml"]
           elementList = doc.getElementsByTagName("employee");
      employeeNode = elementList.item(1);
      childList = employeeNode.childNodes;

      oldChild = childList.item(0);
      removedChild = employeeNode.removeChild(oldChild);
      removedName = removedChild.nodeName;

      child = childList.item(0);
      childName = child.nodeName;

      length = childList.length;

      
	if(
	(5 == length)
	) {
	jsUnitCore.assertEquals("removedNameNoWhitespace","employeeId",removedName);
       jsUnitCore.assertEquals("childNameNoWhitespace","name",childName);
       
	}
	
		else {
			jsUnitCore.assertEquals("removedName","#text",removedName);
       jsUnitCore.assertEquals("childName","employeeId",childName);
       jsUnitCore.assertEquals("length",12,length);
       
		}
	
})()

