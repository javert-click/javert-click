
var docs = initDOMHeapCoreLevel1();
var jsUnitCore = initJsUnitCore();
var DOMTestCase = initDOMTestCase(jsUnitCore);   


/**
* 
    The "cloneNode(deep)" method returns a copy of the node
    and the subtree under it if deep=true.
    
    Retrieve the second employee and invoke the
    "cloneNode(deep)" method with deep=true.   The
    method should clone this node and the subtree under it.
    The NodeName of each child in the returned node is 
    checked to insure the entire subtree under the second
    employee was cloned.

* @author NIST
* @author Mary Brady
* @see http://www.w3.org/TR/1998/REC-DOM-Level-1-19981001/level-one-core#ID-3A0ED0A4
*/

     /*
     * @id nodeclonenodetrue
     */
     (function nodeclonenodetrue() {
   var success; 
    var doc;
      var elementList;
      var employeeNode;
      var childList;
      var clonedNode;
      var clonedList;
      var clonedChild;
      var clonedChildName;
      var length;
      var result = new Array();

      var expectedWhitespace = new Array();
      expectedWhitespace[0] = "#text";
      expectedWhitespace[1] = "employeeId";
      expectedWhitespace[2] = "#text";
      expectedWhitespace[3] = "name";
      expectedWhitespace[4] = "#text";
      expectedWhitespace[5] = "position";
      expectedWhitespace[6] = "#text";
      expectedWhitespace[7] = "salary";
      expectedWhitespace[8] = "#text";
      expectedWhitespace[9] = "gender";
      expectedWhitespace[10] = "#text";
      expectedWhitespace[11] = "address";
      expectedWhitespace[12] = "#text";

      var expectedNoWhitespace = new Array();
      expectedNoWhitespace[0] = "employeeId";
      expectedNoWhitespace[1] = "name";
      expectedNoWhitespace[2] = "position";
      expectedNoWhitespace[3] = "salary";
      expectedNoWhitespace[4] = "gender";
      expectedNoWhitespace[5] = "address";

      
	   
	   
	doc = docs["staff.xml"]
           elementList = doc.getElementsByTagName("employee");
      employeeNode = elementList.item(1);
      childList = employeeNode.childNodes;

      length = childList.length;

      clonedNode = employeeNode.cloneNode(true);
      clonedList = clonedNode.childNodes;

      for(var indexN65710 = 0;indexN65710 < clonedList.length; indexN65710++) {
      clonedChild = clonedList.item(indexN65710);
      clonedChildName = clonedChild.nodeName;

      result[result.length] = clonedChildName;

	}
   
	if(
	(6 == length)
	) {
	DOMTestCase.assertEqualsList("nowhitespace",expectedNoWhitespace,result);
       
	}
	
		else {
			DOMTestCase.assertEqualsList("whitespace",expectedWhitespace,result);
       
		}
	
})()

