
var docs = initDOMHeapCoreLevel1();
var jsUnitCore = initJsUnitCore();
var DOMTestCase = initDOMTestCase(jsUnitCore);   


/**
* 
    The "getDoctype()" method returns null for XML documents
   without a document type declaration.
   Retrieve the XML document without a DTD and invoke the 
   "getDoctype()" method.  It should return null. 

* @author NIST
* @author Mary Brady
* @see http://www.w3.org/TR/1998/REC-DOM-Level-1-19981001/level-one-core#ID-B63ED1A31
*/

     /*
     * @id documentgetdoctypenodtd
     */
     (function documentgetdoctypenodtd() {
   var success; 
    var doc;
      var docType;
      
	   
	   
	doc = docs["hc_nodtdstaff.xml"]
           docType = doc.doctype;

      jsUnitCore.assertNull("documentGetDocTypeNoDTDAssert",docType);
    
})()

