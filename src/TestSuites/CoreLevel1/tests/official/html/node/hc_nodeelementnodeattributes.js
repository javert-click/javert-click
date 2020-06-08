
var docs = initDOMHeapCoreLevel1();
var jsUnitCore = initJsUnitCore();
var DOMTestCase = initDOMTestCase(jsUnitCore);   


/**
* 
    Retrieve the third "acronym" element and evaluate Node.attributes.

* @author Curt Arnold
* @see http://www.w3.org/TR/1998/REC-DOM-Level-1-19981001/level-one-core#ID-84CF096
* @see http://www.w3.org/Bugs/Public/show_bug.cgi?id=236
* @see http://lists.w3.org/Archives/Public/www-dom-ts/2003Jun/0011.html
* @see http://www.w3.org/Bugs/Public/show_bug.cgi?id=184
*/

     /*
     * @id hc_nodeelementnodeattributes
     */
     (function hc_nodeelementnodeattributes() {
   var success; 
    var doc;
      var elementList;
      var testAddr;
      var addrAttr;
      var attrNode;
      var attrName;
      var attrList = new Array();

      var htmlExpected = new Array();
      htmlExpected[0] = "title";
      htmlExpected[1] = "class";

      var expected = new Array();
      expected[0] = "title";
      expected[1] = "class";
      expected[2] = "dir";

      
	   
	   
	doc = docs["hc_staff.html"]
           elementList = doc.getElementsByTagName("acronym");
      testAddr = elementList.item(2);
      addrAttr = testAddr.attributes;

      for(var indexN65648 = 0;indexN65648 < addrAttr.length; indexN65648++) {
      attrNode = addrAttr.item(indexN65648);
      attrName = attrNode.nodeName;

      attrList[attrList.length] = attrName;

	}
   
	if(
	
	(doc.doctype.content == "text/html")

	) {
	DOMTestCase.assertEqualsCollection("attrNames_html",DOMTestCase.toLowerArray(htmlExpected),DOMTestCase.toLowerArray(attrList));
       
	}
	
		else {
			DOMTestCase.assertEqualsCollection("attrNames",expected,attrList);
       
		}
	
})()

