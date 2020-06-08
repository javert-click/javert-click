
var docs = initDOMHeapCoreLevel1();
var jsUnitCore = initJsUnitCore();
var DOMTestCase = initDOMTestCase(jsUnitCore);   


/**
* 
    The string returned by the "getNodeName()" method for a 
    Comment Node is "#comment".
    
    Retrieve the Comment node in the XML file 
    and check the string returned by the "getNodeName()" 
    method.   It should be equal to "#comment".

* @author Curt Arnold
* @see http://www.w3.org/TR/1998/REC-DOM-Level-1-19981001/level-one-core#ID-F68D095
* @see http://www.w3.org/TR/1998/REC-DOM-Level-1-19981001/level-one-core#ID-1728279322
* @see http://www.w3.org/Bugs/Public/show_bug.cgi?id=248
*/

     /*
     * @id hc_nodecommentnodename
     */
     (function hc_nodecommentnodename() {
   var success; 
    var doc;
      var elementList;
      var commentNode;
      var nodeType;
      var commentName;
      var commentNodeName;
      
	   
	   
	doc = docs["hc_staff.html"]
           elementList = doc.childNodes;

      for(var indexN65604 = 0;indexN65604 < elementList.length; indexN65604++) {
      commentNode = elementList.item(indexN65604);
      nodeType = commentNode.nodeType;

      
	if(
	(8 == nodeType)
	) {
	commentNodeName = commentNode.nodeName;

      jsUnitCore.assertEquals("existingNodeName","#comment",commentNodeName);
       
	}
	
	}
   commentNode = doc.createComment("This is a comment");
      commentNodeName = commentNode.nodeName;

      jsUnitCore.assertEquals("createdNodeName","#comment",commentNodeName);
       
})()

