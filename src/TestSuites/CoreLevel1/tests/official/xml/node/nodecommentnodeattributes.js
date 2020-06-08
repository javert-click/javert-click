
var docs = initDOMHeapCoreLevel1();
var jsUnitCore = initJsUnitCore();
var DOMTestCase = initDOMTestCase(jsUnitCore);   


/**
* 
    The "getAttributes()" method invoked on a Comment 
    Node returns null.

    Find any comment that is an immediate child of the root
    and assert that Node.attributes is null.  Then create
    a new comment node (in case they had been omitted) and
    make the assertion.    

* @author NIST
* @author Mary Brady
* @see http://www.w3.org/TR/1998/REC-DOM-Level-1-19981001/level-one-core#ID-84CF096
* @see http://www.w3.org/TR/1998/REC-DOM-Level-1-19981001/level-one-core#ID-1728279322
* @see http://www.w3.org/Bugs/Public/show_bug.cgi?id=248
*/

     /*
     * @id nodecommentnodeattributes
     */
     (function nodecommentnodeattributes() {
   var success; 
    var doc;
      var childList;
      var childNode;
      var attrList;
      var nodeType;
      
	   
	   
	doc = docs["staff.xml"]
           childList = doc.childNodes;

      for(var indexN65603 = 0;indexN65603 < childList.length; indexN65603++) {
      childNode = childList.item(indexN65603);
      nodeType = childNode.nodeType;

      
	if(
	(8 == nodeType)
	) {
	attrList = childNode.attributes;

      jsUnitCore.assertNull("attributesNull",attrList);
    
	}
	
	}
   childNode = doc.createComment("This is a comment");
      attrList = childNode.attributes;

      jsUnitCore.assertNull("createdAttributesNull",attrList);
    
})()

