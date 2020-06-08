
var docs = initDOMHeapCoreLevel1();
var jsUnitCore = initJsUnitCore();
var DOMTestCase = initDOMTestCase(jsUnitCore);   


/**
* 
    The "getNodeType()" method for a Comment Node
    returns the constant value 8.
    
    Retrieve the nodes from the document and check for
    a comment node and invoke the "getNodeType()" method.   This should   
    return 8. 

* @author Curt Arnold
* @see http://www.w3.org/TR/1998/REC-DOM-Level-1-19981001/level-one-core#ID-111237558
* @see http://www.w3.org/TR/1998/REC-DOM-Level-1-19981001/level-one-core#ID-1728279322
* @see http://www.w3.org/Bugs/Public/show_bug.cgi?id=248
*/

     /*
     * @id hc_nodecommentnodetype
     */
     (function hc_nodecommentnodetype() {
   var success; 
    var doc;
      var testList;
      var commentNode;
      var commentNodeName;
      var nodeType;
      
	   
	   
	doc = docs["hc_staff.html"]
           testList = doc.childNodes;

      for(var indexN65600 = 0;indexN65600 < testList.length; indexN65600++) {
      commentNode = testList.item(indexN65600);
      commentNodeName = commentNode.nodeName;

      
	if(
	("#comment" == commentNodeName)
	) {
	nodeType = commentNode.nodeType;

      jsUnitCore.assertEquals("existingCommentNodeType",8,nodeType);
       
	}
	
	}
   commentNode = doc.createComment("This is a comment");
      nodeType = commentNode.nodeType;

      jsUnitCore.assertEquals("createdCommentNodeType",8,nodeType);
       
})()

