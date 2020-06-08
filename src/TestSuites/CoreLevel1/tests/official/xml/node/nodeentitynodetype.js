
var docs = initDOMHeapCoreLevel1();
var jsUnitCore = initJsUnitCore();
var DOMTestCase = initDOMTestCase(jsUnitCore);   


/**
* 
    The "getNodeType()" method for an Entity Node
    returns the constant value 6.

* @author NIST
* @author Mary Brady
* @see http://www.w3.org/TR/1998/REC-DOM-Level-1-19981001/level-one-core#ID-111237558
*/

     /*
     * @id nodeentitynodetype
     */
     (function nodeentitynodetype() {
   var success; 
    var doc;
      var docType;
      var entities;
      var entityNode;
      var nodeType;
      
	   
	   
	doc = docs["staff.xml"]
           docType = doc.doctype;

      jsUnitCore.assertNotNull("docTypeNotNull",docType);
entities = docType.entities;

      jsUnitCore.assertNotNull("entitiesNotNull",entities);
entityNode = entities.getNamedItem("ent1");
      jsUnitCore.assertNotNull("ent1NotNull",entityNode);
nodeType = entityNode.nodeType;

      jsUnitCore.assertEquals("entityNodeType",6,nodeType);
       
})()

