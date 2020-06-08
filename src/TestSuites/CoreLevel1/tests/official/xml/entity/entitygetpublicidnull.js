
var docs = initDOMHeapCoreLevel1();
var jsUnitCore = initJsUnitCore();
var DOMTestCase = initDOMTestCase(jsUnitCore);   


/**
* 
    The "getPublicId()" method of an Entity node contains
   the public identifier associated with the entity, if
   one was not specified a null value should be returned.
   
   Retrieve the entity named "ent1" and access its  
   public identifier.  Since a public identifier was not
   specified for this entity, the "getPublicId()" method 
   should return null.

* @author NIST
* @author Mary Brady
* @see http://www.w3.org/TR/1998/REC-DOM-Level-1-19981001/level-one-core#ID-D7303025
*/

     /*
     * @id entitygetpublicidnull
     */
     (function entitygetpublicidnull() {
   var success; 
    var doc;
      var docType;
      var entityList;
      var entityNode;
      var publicId;
      
	   
	   
	doc = docs["staff.xml"]
           docType = doc.doctype;

      jsUnitCore.assertNotNull("docTypeNotNull",docType);
entityList = docType.entities;

      jsUnitCore.assertNotNull("entitiesNotNull",entityList);
entityNode = entityList.getNamedItem("ent1");
      publicId = entityNode.publicId;

      jsUnitCore.assertNull("entityGetPublicIdNullAssert",publicId);
    
})()

