
var docs = initDOMHeapCoreLevel1();
var jsUnitCore = initJsUnitCore();
var DOMTestCase = initDOMTestCase(jsUnitCore);   


/**
* 
    The "getPublicId()" method of an Entity node contains
   the public identifier associated with the entity, if
   one was specified.
   
   Retrieve the entity named "ent5" and access its  
   public identifier.  The string "entityURI" should be
   returned.

* @author NIST
* @author Mary Brady
* @see http://www.w3.org/TR/1998/REC-DOM-Level-1-19981001/level-one-core#ID-D7303025
* @see http://www.w3.org/TR/1998/REC-DOM-Level-1-19981001/level-one-core#ID-6ABAEB38
* @see http://www.w3.org/TR/1998/REC-DOM-Level-1-19981001/level-one-core#ID-D7C29F3E
*/

     /*
     * @id entitygetpublicid
     */
     (function entitygetpublicid() {
   var success; 
    var doc;
      var docType;
      var entityList;
      var entityNode;
      var publicId;
      var systemId;
      var notation;
      
	   
	   
	doc = docs["staff.xml"]
           docType = doc.doctype;

      jsUnitCore.assertNotNull("docTypeNotNull",docType);
entityList = docType.entities;

      jsUnitCore.assertNotNull("entitiesNotNull",entityList);
entityNode = entityList.getNamedItem("ent5");
      publicId = entityNode.publicId;

      jsUnitCore.assertEquals("publicId","entityURI",publicId);
       systemId = entityNode.systemId;

      DOMTestCase.assertURIEquals("systemId",null,null,null,"entityFile",null,null,null,null,systemId);
notation = entityNode.notationName;

      jsUnitCore.assertEquals("notation","notation1",notation);
       
})()

