
var docs = initDOMHeapCoreLevel1();
var jsUnitCore = initJsUnitCore();
var DOMTestCase = initDOMTestCase(jsUnitCore);   


/**
* 
    The "getAttributes()" method invoked on an EntityReference 
    Node returns null.

* @author NIST
* @author Mary Brady
* @see http://www.w3.org/TR/1998/REC-DOM-Level-1-19981001/level-one-core#ID-84CF096
*/

     /*
     * @id nodeentityreferencenodeattributes
     */
     (function nodeentityreferencenodeattributes() {
   var success; 
    var doc;
      var elementList;
      var entRefAddr;
      var entRefNode;
      var attrList;
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
	attrList = entRefNode.attributes;

      jsUnitCore.assertNull("attrList",attrList);
    
})()

