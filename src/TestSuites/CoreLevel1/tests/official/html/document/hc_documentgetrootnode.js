
var docs = initDOMHeapCoreLevel1();
var jsUnitCore = initJsUnitCore();
var DOMTestCase = initDOMTestCase(jsUnitCore);   


/**
* 
  Load a document and invoke its 
   "getDocumentElement()" method.

* @author Curt Arnold
* @see http://www.w3.org/TR/1998/REC-DOM-Level-1-19981001/level-one-core#ID-87CD092
* @see http://www.w3.org/Bugs/Public/show_bug.cgi?id=251
*/

     /*
     * @id hc_documentgetrootnode
     */
     (function hc_documentgetrootnode() {
   var success; 
    var doc;
      var root;
      var rootName;
      
	   
	   
	doc = docs["hc_staff.html"]
           root = doc.documentElement;

      rootName = root.nodeName;

      
	if(
	
	(doc.doctype.content == "image/svg+xml")

	) {
	jsUnitCore.assertEquals("svgTagName","svg",rootName);
       
	}
	
		else {
			DOMTestCase.assertEqualsAutoCase("element", "docElemName","html",rootName);
       
		}
	
})()

