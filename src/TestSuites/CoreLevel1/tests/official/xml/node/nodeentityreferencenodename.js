
var docs = initDOMHeapCoreLevel1();
var jsUnitCore = initJsUnitCore();
var DOMTestCase = initDOMTestCase(jsUnitCore);   


/**
* 
    The string returned by the "getNodeName()" method for an 
    EntityReference Node is the name of the entity referenced.
    
    Retrieve the first Entity Reference node from the last
    child of the second employee and check the string 
    returned by the "getNodeName()" method.   It should be 
    equal to "ent2". 

* @author NIST
* @author Mary Brady
* @see http://www.w3.org/TR/1998/REC-DOM-Level-1-19981001/level-one-core#ID-F68D095
*/

     /*
     * @id nodeentityreferencenodename
     */
     (function nodeentityreferencenodename() {
   var success; 
    var doc;
      var elementList;
      var entRefAddr;
      var entRefNode;
      var entRefName;
      var nodeType;
      
	   
	   
	doc = docs["staff.xml"]
           elementList = doc.getElementsByTagName("address");
      entRefAddr = elementList.item(1);
      entRefNode = entRefAddr.firstChild;

      nodeType = entRefNode.nodeType;

      
	if(
	!(5 == nodeType)
	) {
	entRefNode = doc.createEntityReference("ent2");
      jsUnitCore.assertNotNull("createdEntRefNotNull",entRefNode);

	}
	entRefName = entRefNode.nodeName;

      jsUnitCore.assertEquals("nodeEntityReferenceNodeNameAssert1","ent2",entRefName);
       
})()

