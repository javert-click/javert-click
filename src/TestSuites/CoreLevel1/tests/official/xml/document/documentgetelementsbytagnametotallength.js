
var docs = initDOMHeapCoreLevel1();
var jsUnitCore = initJsUnitCore();
var DOMTestCase = initDOMTestCase(jsUnitCore);   


/**
* 
   Retrieve the entire DOM document, invoke
   getElementsByTagName("*") and check the length of the NodeList. 

* @author NIST
* @author Mary Brady
* @see http://www.w3.org/TR/1998/REC-DOM-Level-1-19981001/level-one-core#ID-A6C9094
*/

     /*
     * @id documentgetelementsbytagnametotallength
     */
     (function documentgetelementsbytagnametotallength() {
   var success; 
    var doc;
      var nameList;
      
	   
	   
	doc = docs["staff.xml"]
           nameList = doc.getElementsByTagName("*");
      
	if(
	
	(doc.doctype.content == "image/svg+xml")

	) {
	DOMTestCase.assertSize("elementCountSVG",39,nameList);

	}
	
		else {
			DOMTestCase.assertSize("documentGetElementsByTagNameTotalLengthAssert",37,nameList);

		}
	
})()

