
var docs = initDOMHeapCoreLevel1();
var jsUnitCore = initJsUnitCore();
var DOMTestCase = initDOMTestCase(jsUnitCore);   


/**
* 
    The "getSystemId()" method of a Notation node contains
   the system identifier associated with the notation, if
   one was specified.
   
   Retrieve the notation named "notation2" and access its  
   system identifier.  The string "notation2File" should be
   returned.

* @author NIST
* @author Mary Brady
* @see http://www.w3.org/TR/1998/REC-DOM-Level-1-19981001/level-one-core#ID-E8AAB1D0
*/

     /*
     * @id notationgetsystemid
     */
     (function notationgetsystemid() {
   var success; 
    var doc;
      var docType;
      var notations;
      var notationNode;
      var systemId;
      var index;
      
	   
	   
	doc = docs["staff.xml"]
           docType = doc.doctype;

      jsUnitCore.assertNotNull("docTypeNotNull",docType);
notations = docType.notations;

      jsUnitCore.assertNotNull("notationsNotNull",notations);
notationNode = notations.getNamedItem("notation2");
      systemId = notationNode.systemId;

      DOMTestCase.assertURIEquals("uriEquals",null,null,null,"notation2File",null,null,null,null,systemId);

})()

