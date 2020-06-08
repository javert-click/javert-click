
var docs = initDOMHeapCoreLevel1();
var jsUnitCore = initJsUnitCore();
var DOMTestCase = initDOMTestCase(jsUnitCore);   


/**
* 
    Duplicate entities are to be discarded. 
   Retrieve the Document Type for this document and create 
   a NamedNodeMap of all its entities.  The entity named 
   "ent1" is defined twice and therefore that last 
   occurrance should be discarded.

* @author NIST
* @author Mary Brady
* @see http://www.w3.org/TR/1998/REC-DOM-Level-1-19981001/level-one-core#ID-1788794630
*/

     /*
     * @id documenttypegetentitieslength
     */
     (function documenttypegetentitieslength() {
   var success; 
    var doc;
      var docType;
      var entityList;
      
	   
	   
	doc = docs["staff.xml"]
           docType = doc.doctype;

      jsUnitCore.assertNotNull("docTypeNotNull",docType);
entityList = docType.entities;

      jsUnitCore.assertNotNull("entitiesNotNull",entityList);

	if(
	
	(doc.doctype.content == "image/svg+xml")

	) {
	DOMTestCase.assertSize("entitySizeSVG",7,entityList);

	}
	
		else {
			DOMTestCase.assertSize("entitySize",5,entityList);

		}
	
})()

