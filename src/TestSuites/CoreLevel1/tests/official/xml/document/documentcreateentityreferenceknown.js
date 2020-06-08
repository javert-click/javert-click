
var docs = initDOMHeapCoreLevel1();
var jsUnitCore = initJsUnitCore();
var DOMTestCase = initDOMTestCase(jsUnitCore);   


/**
* 
    The "createEntityReference(name)" method creates an 
   EntityReference node.  In addition, if the referenced entity
   is known, the child list of the "EntityReference" node
   is the same as the corresponding "Entity" node.
   
   Retrieve the entire DOM document and invoke its 
   "createEntityReference(name)" method.  It should create 
   a new EntityReference node for the Entity with the 
   given name.  The referenced entity is known, therefore the child
   list of the "EntityReference" node is the same as the corresponding
   "Entity" node.

* @author NIST
* @author Mary Brady
* @see http://www.w3.org/TR/1998/REC-DOM-Level-1-19981001/level-one-core#ID-392B75AE
*/

     /*
     * @id documentcreateentityreferenceknown
     */
     (function documentcreateentityreferenceknown() {
   var success; 
    var doc;
      var newEntRefNode;
      var newEntRefList;
      var child;
      var name;
      var value;
      
	   
	   
	doc = docs["staff.xml"]
           newEntRefNode = doc.createEntityReference("ent3");
      jsUnitCore.assertNotNull("createdEntRefNotNull",newEntRefNode);
newEntRefList = newEntRefNode.childNodes;

      DOMTestCase.assertSize("size",1,newEntRefList);
child = newEntRefNode.firstChild;

      name = child.nodeName;

      jsUnitCore.assertEquals("name","#text",name);
       value = child.nodeValue;

      jsUnitCore.assertEquals("value","Texas",value);
       
})()

