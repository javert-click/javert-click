
var docs = initDOMHeapCoreLevel1();
var jsUnitCore = initJsUnitCore();
var DOMTestCase = initDOMTestCase(jsUnitCore);   


/**
* 
    The string returned by the "getNodeValue()" method for an 
    Entity Node is null.

* @author NIST
* @author Mary Brady
* @see http://www.w3.org/TR/1998/REC-DOM-Level-1-19981001/level-one-core#ID-F68D080
*/

     /*
     * @id nodeentitynodevalue
     */
     (function nodeentitynodevalue() {
   var success; 
    var doc;
      var docType;
      var entities;
      var entityNode;
      var entityValue;
      
	   
	   
	doc = docs["staff.xml"]
           docType = doc.doctype;

      jsUnitCore.assertNotNull("docTypeNotNull",docType);
entities = docType.entities;

      jsUnitCore.assertNotNull("entitiesNotNull",entities);
entityNode = entities.getNamedItem("ent1");
      jsUnitCore.assertNotNull("ent1NotNull",entityNode);
entityValue = entityNode.nodeValue;

      jsUnitCore.assertNull("entityNodeValue",entityValue);
    
})()

