
var docs = initDOMHeapCoreLevel1();
var jsUnitCore = initJsUnitCore();
var DOMTestCase = initDOMTestCase(jsUnitCore);   


/**
* 
    Retrieve the DOCTYPE declaration from the XML file and
    check the string returned by the "getNodeName()" 
    method.   It should be equal to "staff" or "svg". 

* @author NIST
* @author Mary Brady
* @see http://www.w3.org/TR/1998/REC-DOM-Level-1-19981001/level-one-core#ID-F68D095
*/

     /*
     * @id nodedocumenttypenodename
     */
     (function nodedocumenttypenodename() {
   var success; 
    var doc;
      var docType;
      var documentTypeName;
      
	   
	   
	doc = docs["staff.xml"]
           docType = doc.doctype;

      jsUnitCore.assertNotNull("docTypeNotNull",docType);
documentTypeName = docType.nodeName;

      
	if(
	
	(doc.doctype.content == "image/svg+xml")

	) {
	jsUnitCore.assertEquals("doctypeNameSVG","svg",documentTypeName);
       
	}
	
		else {
			jsUnitCore.assertEquals("documentName","staff",documentTypeName);
       
		}
	
})()

