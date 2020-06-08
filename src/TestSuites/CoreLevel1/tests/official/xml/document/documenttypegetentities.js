
var docs = initDOMHeapCoreLevel1();
var jsUnitCore = initJsUnitCore();
var DOMTestCase = initDOMTestCase(jsUnitCore);   


/**
* 
    The "getEntities()" method is a NamedNodeMap that contains
   the general entities for this document. 
   
   Retrieve the Document Type for this document and create 
   a NamedNodeMap of all its entities.  The entire map is
   traversed and the names of the entities are retrieved.
   There should be 5 entities.  Duplicates should be ignored.

* @author NIST
* @author Mary Brady
* @see http://www.w3.org/TR/1998/REC-DOM-Level-1-19981001/level-one-core#ID-1788794630
*/

     /*
     * @id documenttypegetentities
     */
     (function documenttypegetentities() {
   var success; 
    var doc;
      var docType;
      var entityList;
      var name;
      var expectedResult = new Array();
      expectedResult[0] = "ent1";
      expectedResult[1] = "ent2";
      expectedResult[2] = "ent3";
      expectedResult[3] = "ent4";
      expectedResult[4] = "ent5";

      var expectedResultSVG = new Array();
      expectedResultSVG[0] = "ent1";
      expectedResultSVG[1] = "ent2";
      expectedResultSVG[2] = "ent3";
      expectedResultSVG[3] = "ent4";
      expectedResultSVG[4] = "ent5";
      expectedResultSVG[5] = "svgunit";
      expectedResultSVG[6] = "svgtest";

      var nameList = new Array();

      var entity;
      
	   
	   
	doc = docs["staff.xml"]
           docType = doc.doctype;

      jsUnitCore.assertNotNull("docTypeNotNull",docType);
entityList = docType.entities;

      jsUnitCore.assertNotNull("entitiesNotNull",entityList);
for(var indexN65659 = 0;indexN65659 < entityList.length; indexN65659++) {
      entity = entityList.item(indexN65659);
      name = entity.nodeName;

      nameList[nameList.length] = name;

	}
   
	if(
	
	(doc.doctype.content == "image/svg+xml")

	) {
	DOMTestCase.assertEqualsCollection("entityNamesSVG",expectedResultSVG,nameList);
       
	}
	
		else {
			DOMTestCase.assertEqualsCollection("entityNames",expectedResult,nameList);
       
		}
	
})()

