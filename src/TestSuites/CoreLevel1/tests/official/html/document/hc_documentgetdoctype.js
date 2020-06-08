
var docs = initDOMHeapCoreLevel1();
var jsUnitCore = initJsUnitCore();
var DOMTestCase = initDOMTestCase(jsUnitCore);   


/**
* 
Access Document.doctype for hc_staff, if not text/html should return DocumentType node.
HTML implementations may return null.

* @author Curt Arnold
* @see http://www.w3.org/TR/1998/REC-DOM-Level-1-19981001/level-one-core#ID-B63ED1A31
*/

     /*
     * @id hc_documentgetdoctype
     */
     (function hc_documentgetdoctype() {
   var success; 
    var doc;
      var docType;
      var docTypeName;
      var nodeValue;
      var attributes;
      
	   
	   
	doc = docs["hc_staff.html"]
           docType = doc.doctype;

      
	if(
	
	!(
	(doc.doctype.content == "text/html")
)

	) {
	jsUnitCore.assertNotNull("docTypeNotNull",docType);

	}
	
	if(
	
	(docType != null)

	) {
	docTypeName = docType.name;

      
	if(
	
	(doc.doctype.content == "image/svg+xml")

	) {
	jsUnitCore.assertEquals("nodeNameSVG","svg",docTypeName);
       
	}
	
		else {
			jsUnitCore.assertEquals("nodeName","html",docTypeName);
       
		}
	nodeValue = docType.nodeValue;

      jsUnitCore.assertNull("nodeValue",nodeValue);
    attributes = docType.attributes;

      jsUnitCore.assertNull("attributes",attributes);
    
	}
	
})()

