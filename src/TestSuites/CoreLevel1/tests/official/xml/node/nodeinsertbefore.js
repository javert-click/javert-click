
var docs = initDOMHeapCoreLevel1();
var jsUnitCore = initJsUnitCore();
var DOMTestCase = initDOMTestCase(jsUnitCore);   


/**
* 
    The "insertBefore(newChild,refChild)" method inserts the
    node "newChild" before the node "refChild". 
    
    Insert a newly created Element node before the eigth
    child of the second employee and check the "newChild"
    and "refChild" after insertion for correct placement.

* @author NIST
* @author Mary Brady
* @see http://www.w3.org/TR/1998/REC-DOM-Level-1-19981001/level-one-core#ID-952280727
*/

     /*
     * @id nodeinsertbefore
     */
     (function nodeinsertbefore() {
   var success; 
    var doc;
      var elementList;
      var employeeNode;
      var childList;
      var refChild;
      var newChild;
      var child;
      var childName;
      var length;
      var insertedNode;
      var actual = new Array();

      var expectedWithWhitespace = new Array();
      expectedWithWhitespace[0] = "#text";
      expectedWithWhitespace[1] = "employeeId";
      expectedWithWhitespace[2] = "#text";
      expectedWithWhitespace[3] = "name";
      expectedWithWhitespace[4] = "#text";
      expectedWithWhitespace[5] = "position";
      expectedWithWhitespace[6] = "#text";
      expectedWithWhitespace[7] = "newChild";
      expectedWithWhitespace[8] = "salary";
      expectedWithWhitespace[9] = "#text";
      expectedWithWhitespace[10] = "gender";
      expectedWithWhitespace[11] = "#text";
      expectedWithWhitespace[12] = "address";
      expectedWithWhitespace[13] = "#text";

      var expectedWithoutWhitespace = new Array();
      expectedWithoutWhitespace[0] = "employeeId";
      expectedWithoutWhitespace[1] = "name";
      expectedWithoutWhitespace[2] = "position";
      expectedWithoutWhitespace[3] = "newChild";
      expectedWithoutWhitespace[4] = "salary";
      expectedWithoutWhitespace[5] = "gender";
      expectedWithoutWhitespace[6] = "address";

      var expected = new Array();

      
	   
	   
	doc = docs["staff.xml"]
           elementList = doc.getElementsByTagName("employee");
      employeeNode = elementList.item(1);
      childList = employeeNode.childNodes;

      length = childList.length;

      
	if(
	(6 == length)
	) {
	refChild = childList.item(3);
      expected =  expectedWithoutWhitespace;

	}
	
		else {
			refChild = childList.item(7);
      expected =  expectedWithWhitespace;

		}
	newChild = doc.createElement("newChild");
      insertedNode = employeeNode.insertBefore(newChild,refChild);
      for(var indexN65756 = 0;indexN65756 < childList.length; indexN65756++) {
      child = childList.item(indexN65756);
      childName = child.nodeName;

      actual[actual.length] = childName;

	}
   DOMTestCase.assertEqualsList("nodeNames",expected,actual);
       
})()

