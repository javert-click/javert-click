
var docs = initDOMHeapCoreLevel1();
var jsUnitCore = initJsUnitCore();
var DOMTestCase = initDOMTestCase(jsUnitCore);   


/**
* 
   Retrieve the entire DOM document and invoke its 
   "getImplementation()" method.  If contentType="text/html", 
   DOMImplementation.hasFeature("HTML","1.0") should be true.  
   Otherwise, DOMImplementation.hasFeature("XML", "1.0")
   should be true.

* @author Curt Arnold
* @see http://www.w3.org/TR/1998/REC-DOM-Level-1-19981001/level-one-core#ID-1B793EBA
* @see http://www.w3.org/Bugs/Public/show_bug.cgi?id=245
*/

     /*
     * @id hc_documentgetimplementation
     */
     (function hc_documentgetimplementation() {
   var success; 
    var doc;
      var docImpl;
      var xmlstate;
      var htmlstate;
      
	   
	   
	doc = docs["hc_staff.html"]
           docImpl = doc.implementation;
xmlstate = docImpl.hasFeature("XML","1.0");
htmlstate = docImpl.hasFeature("HTML","1.0");

	if(
	
	(doc.doctype.content == "text/html")

	) {
	jsUnitCore.assertTrue("supports_HTML_1.0",htmlstate);

	}
	
		else {
			jsUnitCore.assertTrue("supports_XML_1.0",xmlstate);

		}
	
})()

