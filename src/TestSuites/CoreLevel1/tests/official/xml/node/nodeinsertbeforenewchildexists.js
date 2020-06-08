
var docs = initDOMHeapCoreLevel1();
var jsUnitCore = initJsUnitCore();
var DOMTestCase = initDOMTestCase(jsUnitCore);   


/**
* 
    If the "newChild" is already in the tree, the
    "insertBefore(newChild,refChild)" method must first
    remove it before the insertion takes place.
    
    Insert a node Element ("employeeId") that is already
    present in the tree.   The existing node should be 
    removed first and the new one inserted.   The node is
    inserted at a different position in the tree to assure
    that it was indeed inserted.

* @author NIST
* @author Mary Brady
* @see http://www.w3.org/TR/1998/REC-DOM-Level-1-19981001/level-one-core#ID-952280727
*/

     /*
     * @id nodeinsertbeforenewchildexists
     */
     (function nodeinsertbeforenewchildexists() {
   var success; 
    var doc;
      var elementList;
      var employeeNode;
      var childList;
      var refChild;
      var newChild;
      var child;
      var length;
      var childName;
      var insertedNode;
      var expectedWhitespace = new Array();
      expectedWhitespace[0] = "#text";
      expectedWhitespace[1] = "#text";
      expectedWhitespace[2] = "name";
      expectedWhitespace[3] = "#text";
      expectedWhitespace[4] = "position";
      expectedWhitespace[5] = "#text";
      expectedWhitespace[6] = "salary";
      expectedWhitespace[7] = "#text";
      expectedWhitespace[8] = "gender";
      expectedWhitespace[9] = "#text";
      expectedWhitespace[10] = "employeeId";
      expectedWhitespace[11] = "address";
      expectedWhitespace[12] = "#text";

      var expectedNoWhitespace = new Array();
      expectedNoWhitespace[0] = "name";
      expectedNoWhitespace[1] = "position";
      expectedNoWhitespace[2] = "salary";
      expectedNoWhitespace[3] = "gender";
      expectedNoWhitespace[4] = "employeeId";
      expectedNoWhitespace[5] = "address";

      var expected = new Array();

      var result = new Array();

      
	   
	   
	doc = docs["staff.xml"]
           elementList = doc.getElementsByTagName("employee");
      employeeNode = elementList.item(1);
      childList = employeeNode.childNodes;

      length = childList.length;

      
	if(
	(6 == length)
	) {
	expected =  expectedNoWhitespace;
refChild = childList.item(5);
      newChild = childList.item(0);
      
	}
	
		else {
			expected =  expectedWhitespace;
refChild = childList.item(11);
      newChild = childList.item(1);
      
		}
	insertedNode = employeeNode.insertBefore(newChild,refChild);
      for(var indexN65757 = 0;indexN65757 < childList.length; indexN65757++) {
      child = childList.item(indexN65757);
      childName = child.nodeName;

      result[result.length] = childName;

	}
   DOMTestCase.assertEqualsList("childNames",expected,result);
       
})()

