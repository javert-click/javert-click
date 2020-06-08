
var docs = initDOMHeapCoreLevel1();
var jsUnitCore = initJsUnitCore();
var DOMTestCase = initDOMTestCase(jsUnitCore);   


/**
* 
   Retrieve the entire DOM document and invoke its 
   "getElementsByTagName(tagName)" method with tagName
   equal to "*".  The method should return a NodeList 
   that contains all the elements of the document. 

* @author Curt Arnold
* @see http://www.w3.org/TR/1998/REC-DOM-Level-1-19981001/level-one-core#ID-A6C9094
* @see http://www.w3.org/Bugs/Public/show_bug.cgi?id=251
*/

     /*
     * @id hc_documentgetelementsbytagnametotallength
     */
     (function hc_documentgetelementsbytagnametotallength() {
   var success; 
    var doc;
      var nameList;
      var expectedNames = new Array();
      expectedNames[0] = "html";
      expectedNames[1] = "head";
      expectedNames[2] = "meta";
      expectedNames[3] = "title";
      expectedNames[4] = "script";
      expectedNames[5] = "script";
      expectedNames[6] = "script";
      expectedNames[7] = "body";
      expectedNames[8] = "p";
      expectedNames[9] = "em";
      expectedNames[10] = "strong";
      expectedNames[11] = "code";
      expectedNames[12] = "sup";
      expectedNames[13] = "var";
      expectedNames[14] = "acronym";
      expectedNames[15] = "p";
      expectedNames[16] = "em";
      expectedNames[17] = "strong";
      expectedNames[18] = "code";
      expectedNames[19] = "sup";
      expectedNames[20] = "var";
      expectedNames[21] = "acronym";
      expectedNames[22] = "p";
      expectedNames[23] = "em";
      expectedNames[24] = "strong";
      expectedNames[25] = "code";
      expectedNames[26] = "sup";
      expectedNames[27] = "var";
      expectedNames[28] = "acronym";
      expectedNames[29] = "p";
      expectedNames[30] = "em";
      expectedNames[31] = "strong";
      expectedNames[32] = "code";
      expectedNames[33] = "sup";
      expectedNames[34] = "var";
      expectedNames[35] = "acronym";
      expectedNames[36] = "p";
      expectedNames[37] = "em";
      expectedNames[38] = "strong";
      expectedNames[39] = "code";
      expectedNames[40] = "sup";
      expectedNames[41] = "var";
      expectedNames[42] = "acronym";

      var svgExpectedNames = new Array();
      svgExpectedNames[0] = "svg";
      svgExpectedNames[1] = "rect";
      svgExpectedNames[2] = "script";
      svgExpectedNames[3] = "head";
      svgExpectedNames[4] = "meta";
      svgExpectedNames[5] = "title";
      svgExpectedNames[6] = "body";
      svgExpectedNames[7] = "p";
      svgExpectedNames[8] = "em";
      svgExpectedNames[9] = "strong";
      svgExpectedNames[10] = "code";
      svgExpectedNames[11] = "sup";
      svgExpectedNames[12] = "var";
      svgExpectedNames[13] = "acronym";
      svgExpectedNames[14] = "p";
      svgExpectedNames[15] = "em";
      svgExpectedNames[16] = "strong";
      svgExpectedNames[17] = "code";
      svgExpectedNames[18] = "sup";
      svgExpectedNames[19] = "var";
      svgExpectedNames[20] = "acronym";
      svgExpectedNames[21] = "p";
      svgExpectedNames[22] = "em";
      svgExpectedNames[23] = "strong";
      svgExpectedNames[24] = "code";
      svgExpectedNames[25] = "sup";
      svgExpectedNames[26] = "var";
      svgExpectedNames[27] = "acronym";
      svgExpectedNames[28] = "p";
      svgExpectedNames[29] = "em";
      svgExpectedNames[30] = "strong";
      svgExpectedNames[31] = "code";
      svgExpectedNames[32] = "sup";
      svgExpectedNames[33] = "var";
      svgExpectedNames[34] = "acronym";
      svgExpectedNames[35] = "p";
      svgExpectedNames[36] = "em";
      svgExpectedNames[37] = "strong";
      svgExpectedNames[38] = "code";
      svgExpectedNames[39] = "sup";
      svgExpectedNames[40] = "var";
      svgExpectedNames[41] = "acronym";

      var actualNames = new Array();

      var thisElement;
      var thisTag;
      
	   
	   
	doc = docs["hc_staff.html"]
      nameList = doc.getElementsByTagName("*");
      for(var indexN65864 = 0;indexN65864 < nameList.length; indexN65864++) {
      thisElement = nameList.item(indexN65864);
      thisTag = thisElement.tagName;

      actualNames[actualNames.length] = thisTag;

	}
   
	if(
	
	(doc.doctype.content == "image/svg+xml")

	) {
	DOMTestCase.assertEqualsListAutoCase("element", "svgTagNames",svgExpectedNames,actualNames);
       
	}
	
		else {
			DOMTestCase.assertEqualsListAutoCase("element", "tagNames",expectedNames,actualNames);
       
		}
	
})()

  