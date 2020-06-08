
var docs = initDOMHeapCoreLevel1();
var jsUnitCore = initJsUnitCore();
var DOMTestCase = initDOMTestCase(jsUnitCore);   


/**
* 
   Retrieve the notation named "notation1" and access its  
   system identifier.  Since a system identifier was not
   specified for this notation, the "getSystemId()" method
   should return null.

* @author NIST
* @author Mary Brady
* @see http://www.w3.org/TR/1998/REC-DOM-Level-1-19981001/level-one-core#ID-E8AAB1D0
*/

     /*
     * @id notationgetsystemidnull
     */
     (function notationgetsystemidnull() {
   var success; 
    var doc;
      var docType;
      var notations;
      var notationNode;
      var systemId;
      
	   
	   
	doc = docs["staff.xml"]
           docType = doc.doctype;

      jsUnitCore.assertNotNull("docTypeNotNull",docType);
notations = docType.notations;

      jsUnitCore.assertNotNull("notationsNotNull",notations);
notationNode = notations.getNamedItem("notation1");
      systemId = notationNode.systemId;

      jsUnitCore.assertNull("systemId",systemId);
    
})()

