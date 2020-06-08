
var docs = initDOMHeapCoreLevel1();
var jsUnitCore = initJsUnitCore();
var DOMTestCase = initDOMTestCase(jsUnitCore);   


/**
* 
Get the first child of the third employee using NodeList.item(0)
which will either be a Text node (whitespace) or employeeId element.

* @author NIST
* @author Mary Brady
* @see http://www.w3.org/TR/1998/REC-DOM-Level-1-19981001/level-one-core#ID-844377136
*/

     /*
     * @id nodelistreturnfirstitem
     */
     (function nodelistreturnfirstitem() {
   var success; 
    var doc;
      var elementList;
      var employeeNode;
      var employeeList;
      var child;
      var childName;
      var length;
      
	   
	   
	doc = docs["staff.xml"]
           elementList = doc.getElementsByTagName("employee");
      employeeNode = elementList.item(2);
      employeeList = employeeNode.childNodes;

      child = employeeList.item(0);
      childName = child.nodeName;

      length = employeeList.length;

      
	if(
	(6 == length)
	) {
	jsUnitCore.assertEquals("firstChildNoWhitespace","employeeId",childName);
       
	}
	
		else {
			jsUnitCore.assertEquals("firstChildWithWhitespace","#text",childName);
       
		}
	
})()

