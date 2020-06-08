
var docs = initDOMHeapCoreLevel1();
var jsUnitCore = initJsUnitCore();
var DOMTestCase = initDOMTestCase(jsUnitCore);   


/**
* 
   Create a list of all the attributes of the last child
   of the first "p" element by using the "getAttributes()"
   method.

* @author Curt Arnold
* @see http://www.w3.org/TR/1998/REC-DOM-Level-1-19981001/level-one-core#ID-84CF096
* @see http://lists.w3.org/Archives/Public/www-dom-ts/2002Mar/0002.html
* @see http://www.w3.org/Bugs/Public/show_bug.cgi?id=184
*/

     /*
     * @id hc_elementretrieveallattributes
     */
     (function hc_elementretrieveallattributes() {
   var success; 
    var doc;
      var addressList;
      var testAddress;
      var attributes;
      var attribute;
      var attributeName;
      var actual = new Array();

      var htmlExpected = new Array();
      htmlExpected[0] = "title";

      var expected = new Array();
      expected[0] = "title";
      expected[1] = "dir";

      
	   
	   
	doc = docs["hc_staff.html"]
           addressList = doc.getElementsByTagName("acronym");
      testAddress = addressList.item(0);
      attributes = testAddress.attributes;

      for(var indexN65643 = 0;indexN65643 < attributes.length; indexN65643++) {
      attribute = attributes.item(indexN65643);
      attributeName = attribute.nodeName;

      actual[actual.length] = attributeName;

	}
   
	if(
	
	(doc.doctype.content == "text/html")

	) {
	DOMTestCase.assertEqualsCollection("htmlAttributeNames",DOMTestCase.toLowerArray(htmlExpected),DOMTestCase.toLowerArray(actual));
       
	}
	
		else {
			DOMTestCase.assertEqualsCollection("attributeNames",DOMTestCase.toLowerArray(expected),DOMTestCase.toLowerArray(actual));
       
		}
	
})()

