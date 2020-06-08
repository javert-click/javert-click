
var docs = initDOMHeapCoreLevel1();
var jsUnitCore = initJsUnitCore();
var DOMTestCase = initDOMTestCase(jsUnitCore);   


/**
* 
    The "createEntityReference(name)" method creates an 
   EntityReferrence node.
   
   Retrieve the entire DOM document and invoke its 
   "createEntityReference(name)" method.  It should create 
   a new EntityReference node for the Entity with the 
   given name.  The name, value and type are retrieved and
   output.

* @author NIST
* @author Mary Brady
* @author Curt Arnold
* @see http://www.w3.org/TR/1998/REC-DOM-Level-1-19981001/level-one-core#ID-392B75AE
* @see http://www.w3.org/TR/1998/REC-DOM-Level-1-19981001/level-one-core#ID-F68D080
*/

     /*
     * @id documentcreateentityreference
     */
     (function documentcreateentityreference() {
   var success; 
    var doc;
      var newEntRefNode;
      var entRefValue;
      var entRefName;
      var entRefType;
      
	   
	   
	doc = docs["staff.xml"]
           newEntRefNode = doc.createEntityReference("ent1");
      jsUnitCore.assertNotNull("createdEntRefNotNull",newEntRefNode);
entRefValue = newEntRefNode.nodeValue;

      jsUnitCore.assertNull("value",entRefValue);
    entRefName = newEntRefNode.nodeName;

      jsUnitCore.assertEquals("name","ent1",entRefName);
       entRefType = newEntRefNode.nodeType;

      jsUnitCore.assertEquals("type",5,entRefType);
       
})()

