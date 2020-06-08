
var docs = initDOMHeapCoreLevel1();
var jsUnitCore = initJsUnitCore();
var DOMTestCase = initDOMTestCase(jsUnitCore);   


/**
* 
    The range of valid child node indices is 0 thru length -1
   
   Create a list of all the children elements of the third
   employee and traverse the list from index=0 thru
   length -1.     

* @author NIST
* @author Mary Brady
* @see http://www.w3.org/TR/1998/REC-DOM-Level-1-19981001/level-one-core#ID-203510337
* @see http://www.w3.org/TR/1998/REC-DOM-Level-1-19981001/level-one-core#ID-844377136
*/

     /*
     * @id nodelisttraverselist
     */
     (function nodelisttraverselist() {
   var success; 
    var doc;
      var elementList;
      var employeeNode;
      var employeeList;
      var child;
      var childName;
      var result = new Array();

      var length;
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
      employeeNode = elementList.item(2);
      employeeList = employeeNode.childNodes;

      length = employeeList.length;

      for(var indexN65700 = 0;indexN65700 < employeeList.length; indexN65700++) {
      child = employeeList.item(indexN65700);
      childName = child.nodeName;

      result[result.length] = childName;

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

