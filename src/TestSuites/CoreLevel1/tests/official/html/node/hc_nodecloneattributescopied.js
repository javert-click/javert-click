
var docs = initDOMHeapCoreLevel1();
var jsUnitCore = initJsUnitCore();
var DOMTestCase = initDOMTestCase(jsUnitCore);   


/**
* 
    Retrieve the second acronym element and invoke
    the cloneNode method.   The
    duplicate node returned by the method should copy the
    attributes associated with this node.

* @author Curt Arnold
* @see http://www.w3.org/TR/1998/REC-DOM-Level-1-19981001/level-one-core#ID-84CF096
* @see http://www.w3.org/Bugs/Public/show_bug.cgi?id=236
* @see http://www.w3.org/Bugs/Public/show_bug.cgi?id=184
*/

     /*
     * @id hc_nodecloneattributescopied
     */
     (function hc_nodecloneattributescopied() {
   var success; 
    var doc;
      var elementList;
      var addressNode;
      var clonedNode;
      var attributes;
      var attributeNode;
      var attributeName;
      var result = new Array();

      var htmlExpected = new Array();
      htmlExpected[0] = "class";
      htmlExpected[1] = "title";

      var expected = new Array();
      expected[0] = "class";
      expected[1] = "title";
      expected[2] = "dir";

      
	   
	   
	doc = docs["hc_staff.html"]
           elementList = doc.getElementsByTagName("acronym");
      addressNode = elementList.item(1);
      clonedNode = addressNode.cloneNode(false);
      attributes = clonedNode.attributes;

      for(var indexN65654 = 0;indexN65654 < attributes.length; indexN65654++) {
      attributeNode = attributes.item(indexN65654);
      attributeName = attributeNode.nodeName;

      result[result.length] = attributeName;

	}
   
	if(
	
	(doc.doctype.content == "text/html")

	) {
	DOMTestCase.assertEqualsCollection("nodeNames_html",DOMTestCase.toLowerArray(htmlExpected),DOMTestCase.toLowerArray(result));
       
	}
	
		else {
			DOMTestCase.assertEqualsCollection("nodeNames",expected,result);
       
		}
	
})()

