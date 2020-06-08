
var docs = initDOMHeapCoreLevel1();
var jsUnitCore = initJsUnitCore();
var DOMTestCase = initDOMTestCase(jsUnitCore);   


/**
* 
    The "getName()" method contains the name of the DTD. 
   
   Retrieve the Document Type for this document and examine
   the string returned by the "getName()" method.
   It should be set to "staff".

* @author NIST
* @author Mary Brady
* @see http://www.w3.org/TR/1998/REC-DOM-Level-1-19981001/level-one-core#ID-B63ED1A31
* @see http://www.w3.org/TR/1998/REC-DOM-Level-1-19981001/level-one-core#ID-1844763134
*/

     /*
     * @id documenttypegetdoctype
     */
     (function documenttypegetdoctype() {
   var success; 
    var doc;
      var docType;
      var name;
      
	   
	   
	doc = docs["staff.xml"]
           docType = doc.doctype;

      jsUnitCore.assertNotNull("docTypeNotNull",docType);
name = docType.name;

      
	if(
	
	(doc.doctype.content == "image/svg+xml")

	) {
	jsUnitCore.assertEquals("doctypeName","svg",name);
       
	}
	
		else {
			jsUnitCore.assertEquals("documenttypeGetDocTypeAssert","staff",name);
       
		}
	
})()

