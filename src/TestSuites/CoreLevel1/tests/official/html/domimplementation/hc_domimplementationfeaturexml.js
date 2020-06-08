
var docs = initDOMHeapCoreLevel1();
var jsUnitCore = initJsUnitCore();
var DOMTestCase = initDOMTestCase(jsUnitCore);   


/**
* 
   Retrieve the entire DOM document and invoke its 
   "getImplementation()" method.  This should create a
   DOMImplementation object whose "hasFeature(feature,
   version)" method is invoked with "feature" equal to "html" or "xml".
   The method should return a boolean "true".

* @author Curt Arnold
* @see http://www.w3.org/TR/1998/REC-DOM-Level-1-19981001/level-one-core#ID-5CED94D7
* @see http://www.w3.org/Bugs/Public/show_bug.cgi?id=245
*/

     /*
     * @id hc_domimplementationfeaturexml
     */
     (function hc_domimplementationfeaturexml() {
   var success; 
    var doc;
      var domImpl;
      var state;
      
	   
	   
	doc = docs["hc_staff.html"]
           domImpl = doc.implementation;

	if(
	
	(doc.doctype.content == "text/html")

	) {
	state = domImpl.hasFeature("html","1.0");
jsUnitCore.assertTrue("supports_html_1.0",state);

	}
	
		else {
			state = domImpl.hasFeature("xml","1.0");
jsUnitCore.assertTrue("supports_xml_1.0",state);

		}
	
})()

