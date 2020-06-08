
var docs = initDOMHeapCoreLevel1();
var jsUnitCore = initJsUnitCore();
var DOMTestCase = initDOMTestCase(jsUnitCore);   


/**
* 
    Every node in the map returned by the "getNotations()"
   method implements the Notation interface.
   
   Retrieve the Document Type for this document and create
   a NamedNodeMap object of all the notations.  Traverse
   the entire list and examine the NodeType of each node.

* @author NIST
* @author Mary Brady
* @see http://www.w3.org/TR/1998/REC-DOM-Level-1-19981001/level-one-core#ID-D46829EF
*/

     /*
     * @id documenttypegetnotationstype
     */
     (function documenttypegetnotationstype() {
   var success; 
    var doc;
      var docType;
      var notationList;
      var notation;
      var notationType;
      
	   
	   
	doc = docs["staff.xml"]
           docType = doc.doctype;

      jsUnitCore.assertNotNull("docTypeNotNull",docType);
notationList = docType.notations;

      jsUnitCore.assertNotNull("notationsNotNull",notationList);
for(var indexN65609 = 0;indexN65609 < notationList.length; indexN65609++) {
      notation = notationList.item(indexN65609);
      notationType = notation.nodeType;

      jsUnitCore.assertEquals("documenttypeGetNotationsTypeAssert",12,notationType);
       
	}
   
})()

