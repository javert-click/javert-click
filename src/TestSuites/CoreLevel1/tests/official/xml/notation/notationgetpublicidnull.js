
var docs = initDOMHeapCoreLevel1();
var jsUnitCore = initJsUnitCore();
var DOMTestCase = initDOMTestCase(jsUnitCore);   


/**
* 
    The "getPublicId()" method of a Notation node contains
   the public identifier associated with the notation, if
   one was not specified a null value should be returned.
   
   Retrieve the notation named "notation2" and access its  
   public identifier.  Since a public identifier was not
   specified for this notation, the "getPublicId()" method
   should return null.

* @author NIST
* @author Mary Brady
* @see http://www.w3.org/TR/1998/REC-DOM-Level-1-19981001/level-one-core#ID-54F2B4D0
*/

     /*
     * @id notationgetpublicidnull
     */
     (function notationgetpublicidnull() {
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
notationNode = notations.getNamedItem("notation2");
      publicId = notationNode.publicId;

      jsUnitCore.assertNull("publicId",publicId);
    
})()

