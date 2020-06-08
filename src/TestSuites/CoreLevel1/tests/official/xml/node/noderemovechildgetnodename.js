
var docs = initDOMHeapCoreLevel1();
var jsUnitCore = initJsUnitCore();
var DOMTestCase = initDOMTestCase(jsUnitCore);   


/**
* 
    Remove the first child of the second employee 
    and check the NodeName returned by the 
    "removeChild(oldChild)" method.   The returned node
    should have a NodeName equal to "#text" or employeeId depending on whitespace.

* @author NIST
* @author Mary Brady
* @see http://www.w3.org/TR/1998/REC-DOM-Level-1-19981001/level-one-core#ID-F68D095
* @see http://www.w3.org/TR/1998/REC-DOM-Level-1-19981001/level-one-core#ID-1734834066
*/

     /*
     * @id noderemovechildgetnodename
     */
     (function noderemovechildgetnodename() {
   var success; 
    var doc;
      var elementList;
      var employeeNode;
      var childList;
      var oldChild;
      var removedChild;
      var childName;
      var length;
      
	   
	   
	doc = docs["staff.xml"]
           elementList = doc.getElementsByTagName("employee");
      employeeNode = elementList.item(1);
      childList = employeeNode.childNodes;

      length = childList.length;

      oldChild = childList.item(0);
      removedChild = employeeNode.removeChild(oldChild);
      childName = removedChild.nodeName;

      
	if(
	(6 == length)
	) {
	jsUnitCore.assertEquals("nowhitespace","employeeId",childName);
       
	}
	
		else {
			jsUnitCore.assertEquals("whitespace","#text",childName);
       
		}
	
})()

