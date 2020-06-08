
var docs = initDOMHeapCoreLevel1();
var jsUnitCore = initJsUnitCore();
var DOMTestCase = initDOMTestCase(jsUnitCore);   


/**
* 
    The "getAttributes()" method invoked on an Entity 
    Node returns null.

* @author NIST
* @author Mary Brady
* @see http://www.w3.org/TR/1998/REC-DOM-Level-1-19981001/level-one-core#ID-84CF096
*/

     /*
     * @id nodeentitynodeattributes
     */
     (function nodeentitynodeattributes() {
   var success; 
    var doc;
      var docType;
      var entities;
      var entityNode;
      var attrList;
      
	   
	   
	doc = docs["staff.xml"]
           docType = doc.doctype;

      jsUnitCore.assertNotNull("docTypeNotNull",docType);
entities = docType.entities;

      jsUnitCore.assertNotNull("entitiesNotNull",entities);
entityNode = entities.getNamedItem("ent1");
      jsUnitCore.assertNotNull("ent1NotNull",entityNode);
attrList = entityNode.attributes;

      jsUnitCore.assertNull("entityAttributesNull",attrList);
    
})()

