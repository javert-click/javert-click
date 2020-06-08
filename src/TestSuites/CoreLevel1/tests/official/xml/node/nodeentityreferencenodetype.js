
var docs = initDOMHeapCoreLevel1();
var jsUnitCore = initJsUnitCore();
var DOMTestCase = initDOMTestCase(jsUnitCore);   


/**
* 
    The "getNodeType()" method for an EntityReference Node
    returns the constant value 5.
    
    Retrieve the EntityReference node from the last child
    of the second employee and invoke the "getNodeType()"   
    method.   The method should return 5. 

* @author NIST
* @author Mary Brady
* @see http://www.w3.org/TR/1998/REC-DOM-Level-1-19981001/level-one-core#ID-111237558
*/

     /*
     * @id nodeentityreferencenodetype
     */
     (function nodeentityreferencenodetype() {
   var success; 
    var doc;
      var elementList;
      var entRefAddr;
      var entRefNode;
      var nodeType;
      
	   
	   
	doc = docs["staff.xml"]
           elementList = doc.getElementsByTagName("address");
      entRefAddr = elementList.item(1);
      entRefNode = entRefAddr.firstChild;

      nodeType = entRefNode.nodeType;

      
	if(
	(3 == nodeType)
	) {
	entRefNode = doc.createEntityReference("ent2");
      jsUnitCore.assertNotNull("createdEntRefNotNull",entRefNode);
nodeType = entRefNode.nodeType;

      
	}
	jsUnitCore.assertEquals("entityNodeType",5,nodeType);
       
})()

