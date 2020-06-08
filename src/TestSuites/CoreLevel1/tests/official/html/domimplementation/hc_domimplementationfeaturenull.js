
var docs = initDOMHeapCoreLevel1();
var jsUnitCore = initJsUnitCore();
var DOMTestCase = initDOMTestCase(jsUnitCore);   


/**
* 
   Load a document and invoke its 
   "getImplementation()" method.  This should create a
   DOMImplementation object whose "hasFeature(feature,
   version)" method is invoked with version equal to null.
   If the version is not specified, supporting any version
   feature will cause the method to return "true".

* @author Curt Arnold
* @author Curt Arnold
* @see http://www.w3.org/TR/1998/REC-DOM-Level-1-19981001/level-one-core#ID-5CED94D7
* @see http://www.w3.org/2000/11/DOM-Level-2-errata#core-14
* @see http://www.w3.org/Bugs/Public/show_bug.cgi?id=245
*/

     /*
     * @id hc_domimplementationfeaturenull
     */
     (function hc_domimplementationfeaturenull() {
   var success; 
    var doc;
      var domImpl;
      var state;
      
	   
	   
	doc = docs["hc_staff.html"]
           domImpl = doc.implementation;

	if(
	
	(doc.doctype.content == "text/html")

	) {
	state = domImpl.hasFeature("HTML",null);
jsUnitCore.assertTrue("supports_HTML_null",state);

	}
	
		else {
			state = domImpl.hasFeature("XML",null);
jsUnitCore.assertTrue("supports_XML_null",state);

		}
	
})()

