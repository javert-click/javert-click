
var docs = initDOMHeapCoreLevel1();
var jsUnitCore = initJsUnitCore();
var DOMTestCase = initDOMTestCase(jsUnitCore);   


/**
* 
Check the nodeName of the entity returned by DocumentType.entities.getNamedItem("ent1").

* @author NIST
* @author Mary Brady
* @see http://www.w3.org/TR/1998/REC-DOM-Level-1-19981001/level-one-core#ID-F68D095
*/

     /*
     * @id nodeentitynodename
     */
     (function nodeentitynodename() {
   var success; 
    var doc;
      var docType;
      var entities;
      var entityNode;
      var entityName;
      
	   
	   
	doc = docs["staff.xml"]
           docType = doc.doctype;

      jsUnitCore.assertNotNull("docTypeNotNull",docType);
entities = docType.entities;

      jsUnitCore.assertNotNull("entitiesNotNull",entities);
entityNode = entities.getNamedItem("ent1");
      jsUnitCore.assertNotNull("entityNodeNotNull",entityNode);
entityName = entityNode.nodeName;

      jsUnitCore.assertEquals("entityNodeName","ent1",entityName);
       
})()

