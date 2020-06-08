
var docs = initDOMHeapCoreLevel1();
var jsUnitCore = initJsUnitCore();
var DOMTestCase = initDOMTestCase(jsUnitCore);   


/**
* 
    Every node in the map returned by the "getEntities()"
   method implements the Entity interface.
   
   Retrieve the Document Type for this document and create 
   a NamedNodeMap of all its entities.  Traverse the 
   entire list and examine the NodeType of each node
   in the list.

* @author NIST
* @author Mary Brady
* @see http://www.w3.org/TR/1998/REC-DOM-Level-1-19981001/level-one-core#ID-1788794630
*/

     /*
     * @id documenttypegetentitiestype
     */
     (function documenttypegetentitiestype() {
   var success; 
    var doc;
      var docType;
      var entityList;
      var entity;
      var entityType;
      
	   
	   
	doc = docs["staff.xml"]
           docType = doc.doctype;

      jsUnitCore.assertNotNull("docTypeNotNull",docType);
entityList = docType.entities;

      jsUnitCore.assertNotNull("entitiesNotNull",entityList);
for(var indexN65609 = 0;indexN65609 < entityList.length; indexN65609++) {
      entity = entityList.item(indexN65609);
      entityType = entity.nodeType;

      jsUnitCore.assertEquals("documenttypeGetEntitiesTypeAssert",6,entityType);
       
	}
   
})()

