
var docs = initDOMHeapCoreLevel1();
var jsUnitCore = initJsUnitCore();
var DOMTestCase = initDOMTestCase(jsUnitCore);   


/**
* 
An attempt to add clone an entity should result in an identical notation.

* @author Gabriela Sampaio
* @see http://www.w3.org/TR/1998/REC-DOM-Level-1-19981001/level-one-core#ID-1788794630
* @see http://www.w3.org/TR/1998/REC-DOM-Level-1-19981001/level-one-core#ID-D58B193
*/

/*
* @id notationclone
*/
(function notationclone() {
    var doc;
    var docType;
    var notationList;
    var notationNode;
    var clonedNotation;

    doc = docs["staff.xml"]
    docType = doc.doctype;
    jsUnitCore.assertNotNull("docTypeNotNull",docType);
    notationList = docType.notations;

    jsUnitCore.assertNotNull("notationsNotNull",notationList);
    notationNode = notationList.getNamedItem("notation1");
    clonedNotation = notationNode.cloneNode();
    jsUnitCore.assertEquals("notationCloneNotationNameAssert",notationNode.nodeName, clonedNotation.nodeName);
    jsUnitCore.assertEquals("notationCloneNotationTypeAssert",notationNode.nodeType, clonedNotation.nodeType);
    jsUnitCore.assertEquals("notationCloneNotationPublicIdAssert",notationNode.publicId, clonedNotation.publicId);
    jsUnitCore.assertEquals("notationCloneNotationSystemIdAssert",notationNode.systemId, clonedNotation.systemId);
})()

