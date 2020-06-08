
var docs = initDOMHeapCoreLevel1();
var jsUnitCore = initJsUnitCore();
var DOMTestCase = initDOMTestCase(jsUnitCore);   


/**
* 
   Retrieve the notation named "notation1" and access its  
   public identifier.  The string "notation1File" should be
   returned.

* @author NIST
* @author Mary Brady
* @see http://www.w3.org/TR/1998/REC-DOM-Level-1-19981001/level-one-core#ID-54F2B4D0
*/

     /*
     * @id notationgetpublicid
     */
     (function notationgetpublicid() {
   var success; 
    var doc;
      var docType;
      var notations;
      var notationNode;
      var publicId;
      
	   
	   
	doc = docs["staff.xml"]
           docType = doc.doctype;

      jsUnitCore.assertNotNull("docTypeNotNull",docType);
notations = docType.notations;

      jsUnitCore.assertNotNull("notationsNotNull",notations);
notationNode = notations.getNamedItem("notation1");
      publicId = notationNode.publicId;

      jsUnitCore.assertEquals("publicId","notation1File",publicId);
       
})()

