
var docs = initDOMHeapCoreLevel1();
var jsUnitCore = initJsUnitCore();
var DOMTestCase = initDOMTestCase(jsUnitCore);   


/**
* 
    The nodeName attribute that is inherited from Node  
   contains the name of the entity.
   
   Retrieve the entity named "ent1" and access its name by 
   invoking the "getNodeName()" method inherited from
   the Node interface.

* @author NIST
* @author Mary Brady
* @see http://www.w3.org/TR/1998/REC-DOM-Level-1-19981001/level-one-core#ID-527DCFF2
* @see http://www.w3.org/TR/1998/REC-DOM-Level-1-19981001/level-one-core#ID-F68D095
*/

     /*
     * @id entitygetentityname
     */
     (function entitygetentityname() {
   var success; 
    var doc;
      var docType;
      var entityList;
      var entityNode;
      var entityName;
      
	   
	   
	doc = docs["staff.xml"]
           docType = doc.doctype;

      jsUnitCore.assertNotNull("docTypeNotNull",docType);
entityList = docType.entities;

      jsUnitCore.assertNotNull("entitiesNotNull",entityList);
entityNode = entityList.getNamedItem("ent1");
      entityName = entityNode.nodeName;

      jsUnitCore.assertEquals("entityGetEntityNameAssert","ent1",entityName);
       
})()

