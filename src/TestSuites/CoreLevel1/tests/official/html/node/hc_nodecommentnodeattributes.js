
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

* @author Curt Arnold
* @see http://www.w3.org/TR/1998/REC-DOM-Level-1-19981001/level-one-core#ID-84CF096
* @see http://www.w3.org/TR/1998/REC-DOM-Level-1-19981001/level-one-core#ID-1728279322
* @see http://www.w3.org/Bugs/Public/show_bug.cgi?id=248
* @see http://www.w3.org/Bugs/Public/show_bug.cgi?id=263
*/

     /*
     * @id hc_nodecommentnodeattributes
     */
     (function hc_nodecommentnodeattributes() {
   var success; 
    var doc;
      var commentNode;
      var nodeList;
      var attrList;
      var nodeType;
      
	   
	   
	doc = docs["hc_staff.html"]
           nodeList = doc.childNodes;

      for(var indexN65603 = 0;indexN65603 < nodeList.length; indexN65603++) {
      commentNode = nodeList.item(indexN65603);
      nodeType = commentNode.nodeType;

      
	if(
	(8 == nodeType)
	) {
	attrList = commentNode.attributes;

      jsUnitCore.assertNull("existingCommentAttributesNull",attrList);
    
	}
	
	}
   commentNode = doc.createComment("This is a comment");
      attrList = commentNode.attributes;

      jsUnitCore.assertNull("createdCommentAttributesNull",attrList);
    
})()

