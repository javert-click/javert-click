
var docs = initDOMHeapCoreLevel1();
var jsUnitCore = initJsUnitCore();
var DOMTestCase = initDOMTestCase(jsUnitCore);   


/**
* 
    Retrieve the second employee and replace its TWELFTH 
    child(address) with its SECOND child(employeeId).   After the
    replacement the second child should now be the one that used   
    to be at the third position and the TWELFTH child should be the
    one that used to be at the SECOND position.

* @author NIST
* @author Mary Brady
* @see http://www.w3.org/TR/1998/REC-DOM-Level-1-19981001/level-one-core#ID-785887307
*/

     /*
     * @id nodereplacechildnewchildexists
     */
     (function nodereplacechildnewchildexists() {
   var success; 
    var doc;
      var elementList;
      var employeeNode;
      var childList;
      var oldChild = null;

      var newChild = null;

      var childName;
      var childNode;
      var length;
      var actual = new Array();

      var expected = new Array();

      var expectedWithoutWhitespace = new Array();
      expectedWithoutWhitespace[0] = "name";
      expectedWithoutWhitespace[1] = "position";
      expectedWithoutWhitespace[2] = "salary";
      expectedWithoutWhitespace[3] = "gender";
      expectedWithoutWhitespace[4] = "employeeId";

      var expectedWithWhitespace = new Array();
      expectedWithWhitespace[0] = "#text";
      expectedWithWhitespace[1] = "#text";
      expectedWithWhitespace[2] = "name";
      expectedWithWhitespace[3] = "#text";
      expectedWithWhitespace[4] = "position";
      expectedWithWhitespace[5] = "#text";
      expectedWithWhitespace[6] = "salary";
      expectedWithWhitespace[7] = "#text";
      expectedWithWhitespace[8] = "gender";
      expectedWithWhitespace[9] = "#text";
      expectedWithWhitespace[10] = "employeeId";
      expectedWithWhitespace[11] = "#text";

      var replacedChild;
      
	   
	   
	doc = docs["staff.xml"]
           elementList = doc.getElementsByTagName("employee");
      employeeNode = elementList.item(1);
      childList = employeeNode.childNodes;

      length = childList.length;

      
	if(
	(13 == length)
	) {
	newChild = childList.item(1);
      oldChild = childList.item(11);
      expected =  expectedWithWhitespace;

	}
	
		else {
			newChild = childList.item(0);
      oldChild = childList.item(5);
      expected =  expectedWithoutWhitespace;

		}
	replacedChild = employeeNode.replaceChild(newChild,oldChild);
      DOMTestCase.assertSame("return_value_same",oldChild,replacedChild);
for(var indexN65758 = 0;indexN65758 < childList.length; indexN65758++) {
      childNode = childList.item(indexN65758);
      childName = childNode.nodeName;

      actual[actual.length] = childName;

	}
   DOMTestCase.assertEqualsList("childNames",expected,actual);
       
})()

