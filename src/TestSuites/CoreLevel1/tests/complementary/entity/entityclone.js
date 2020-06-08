
var docs = initDOMHeapCoreLevel1();
var jsUnitCore = initJsUnitCore();
var DOMTestCase = initDOMTestCase(jsUnitCore);   


/**
* 
An attempt to add clone an entity should result in an identical entity.

* @author Gabriela Sampaio
* @see http://www.w3.org/TR/1998/REC-DOM-Level-1-19981001/level-one-core#ID-1788794630
* @see http://www.w3.org/TR/1998/REC-DOM-Level-1-19981001/level-one-core#ID-D58B193
*/

/*
* @id entityclone
*/
(function entityclone() {
    var doc;
    var docType;
    var entityList;
    var entityNode;
    var clonedEntity;

    doc = docs["staff.xml"]
    docType = doc.doctype;
    jsUnitCore.assertNotNull("docTypeNotNull",docType);
    entityList = docType.entities;

    jsUnitCore.assertNotNull("entitiesNotNull",entityList);
    entityNode = entityList.getNamedItem("ent1");
    clonedEntity = entityNode.cloneNode();
    jsUnitCore.assertEquals("entityCloneEntityNameAssert",entityNode.nodeName, clonedEntity.nodeName);
    jsUnitCore.assertEquals("entityCloneEntityTypeAssert",entityNode.nodeType, clonedEntity.nodeType);
    jsUnitCore.assertEquals("entityCloneEntityPublicIdAssert",entityNode.publicId, clonedEntity.publicId);
    jsUnitCore.assertEquals("entityCloneEntitySystemIdAssert",entityNode.systemId, clonedEntity.systemId);
})()

