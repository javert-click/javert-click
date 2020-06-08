
var docs = initDOMHeapCoreLevel1();
var jsUnitCore = initJsUnitCore();
var DOMTestCase = initDOMTestCase(jsUnitCore);   


/**
* 
    The "item(index)" method returns the indexth item in 
   the map(test for last item). 
   
   Retrieve the second "acronym" and get the attribute name. Since the
   DOM does not specify an order of these nodes the contents
   of the LAST node can contain either "title" or "class".
   The test should return "true" if the LAST node is either
   of these values.

* @author Curt Arnold
* @see http://www.w3.org/TR/1998/REC-DOM-Level-1-19981001/level-one-core#ID-349467F9
* @see http://www.w3.org/Bugs/Public/show_bug.cgi?id=236
* @see http://lists.w3.org/Archives/Public/www-dom-ts/2003Jun/0011.html
* @see http://www.w3.org/Bugs/Public/show_bug.cgi?id=184
*/

     /*
     * @id hc_namednodemapreturnlastitem
     */
     (function hc_namednodemapreturnlastitem() {
   var success; 
    var doc;
      var elementList;
      var testEmployee;
      var attributes;
      var child;
      var nodeName;
      var htmlExpected = new Array();
      htmlExpected[0] = "title";
      htmlExpected[1] = "class";

      var expected = new Array();
      expected[0] = "title";
      expected[1] = "class";
      expected[2] = "dir";

      var actual = new Array();

      
	   
	   
	doc = docs["hc_staff.html"]
           elementList = doc.getElementsByTagName("acronym");
      testEmployee = elementList.item(1);
      attributes = testEmployee.attributes;

      for(var indexN65648 = 0;indexN65648 < attributes.length; indexN65648++) {
      child = attributes.item(indexN65648);
      nodeName = child.nodeName;

      actual[actual.length] = nodeName;

	}
   
	if(
	
	(doc.doctype.content == "text/html")

	) {
	DOMTestCase.assertEqualsCollection("attrName_html",DOMTestCase.toLowerArray(htmlExpected),DOMTestCase.toLowerArray(actual));
       
	}
	
		else {
			DOMTestCase.assertEqualsCollection("attrName",expected,actual);
       
		}
	
})()

