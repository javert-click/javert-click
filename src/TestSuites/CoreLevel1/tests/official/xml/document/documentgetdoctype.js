
var docs = initDOMHeapCoreLevel1();
var jsUnitCore = initJsUnitCore();
var DOMTestCase = initDOMTestCase(jsUnitCore);   


/**
* 
    The "getDoctype()" method returns the Document 
   Type Declaration associated with this document.
   Retrieve the entire DOM document and invoke its 
   "getDoctype()" method.  The name of the document
   type should be returned.  The "getName()" method
   should be equal to "staff" or "svg".

* @author NIST
* @author Mary Brady
* @see http://www.w3.org/TR/1998/REC-DOM-Level-1-19981001/level-one-core#ID-B63ED1A31
* @see http://www.w3.org/TR/1998/REC-DOM-Level-1-19981001/level-one-core#ID-F68D080
* @see http://www.w3.org/Bugs/Public/show_bug.cgi?id=249
*/

     /*
     * @id documentgetdoctype
     */
     (function documentgetdoctype() {
   var success; 
    var doc;
      var docType;
      var docTypeName;
      var nodeValue;
      
	   
	   
	doc = docs["staff.xml"]
           docType = doc.doctype;

      jsUnitCore.assertNotNull("docTypeNotNull",docType);
docTypeName = docType.name;

      
	if(
	
	(doc.doctype.content == "image/svg+xml")

	) {
	jsUnitCore.assertEquals("doctypeNameSVG","svg",docTypeName);
       
	}
	
		else {
			jsUnitCore.assertEquals("doctypeName","staff",docTypeName);
       
		}
	nodeValue = docType.nodeValue;

      jsUnitCore.assertNull("initiallyNull",nodeValue);
    
})()

