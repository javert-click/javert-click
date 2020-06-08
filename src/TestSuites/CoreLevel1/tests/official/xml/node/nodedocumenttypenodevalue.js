
var docs = initDOMHeapCoreLevel1();
var jsUnitCore = initJsUnitCore();
var DOMTestCase = initDOMTestCase(jsUnitCore);   


/**
* 
    The string returned by the "getNodeValue()" method for a 
    DocumentType Node is null.

* @author NIST
* @author Mary Brady
*/

     /*
     * @id nodedocumenttypenodevalue
     */
     (function nodedocumenttypenodevalue() {
   var success; 
    var doc;
      var docType;
      var attrList;
      
	   
	   
	doc = docs["staff.xml"]
           docType = doc.doctype;

      jsUnitCore.assertNotNull("docTypeNotNull",docType);
attrList = docType.attributes;

      jsUnitCore.assertNull("doctypeAttributesNull",attrList);
    
})()

