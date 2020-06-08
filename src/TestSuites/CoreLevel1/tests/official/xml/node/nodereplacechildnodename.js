
var docs = initDOMHeapCoreLevel1();
var jsUnitCore = initJsUnitCore();
var DOMTestCase = initDOMTestCase(jsUnitCore);   


/**
* 
    Replace the second Element of the second employee with
    a newly created node Element and check the NodeName 
    returned by the "replaceChild(newChild,oldChild)"
    method.   The returned node should have a NodeName equal
    to "employeeId".

* @author NIST
* @author Mary Brady
* @see http://www.w3.org/TR/1998/REC-DOM-Level-1-19981001/level-one-core#ID-F68D095
* @see http://www.w3.org/TR/1998/REC-DOM-Level-1-19981001/level-one-core#ID-785887307
*/

     /*
     * @id nodereplacechildnodename
     */
     (function nodereplacechildnodename() {
   var success; 
    var doc;
      var elementList;
      var employeeNode;
      var childList;
      var oldChild;
      var newChild;
      var replacedNode;
      var length;
      var childName;
      
	   
	   
	doc = docs["staff.xml"]
           elementList = doc.getElementsByTagName("employee");
      employeeNode = elementList.item(1);
      childList = employeeNode.childNodes;

      length = childList.length;

      oldChild = childList.item(1);
      newChild = doc.createElement("newChild");
      replacedNode = employeeNode.replaceChild(newChild,oldChild);
      childName = replacedNode.nodeName;

      
	if(
	(6 == length)
	) {
	jsUnitCore.assertEquals("nowhitespace","name",childName);
       
	}
	
		else {
			jsUnitCore.assertEquals("whitespace","employeeId",childName);
       
		}
	
})()

