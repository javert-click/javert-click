
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

* @author NIST
* @author Mary Brady
* @see http://www.w3.org/TR/1998/REC-DOM-Level-1-19981001/level-one-core#ID-F68D095
* @see http://www.w3.org/TR/1998/REC-DOM-Level-1-19981001/level-one-core#ID-1728279322
*/

     /*
     * @id nodecommentnodename
     */
     (function nodecommentnodename() {
   var success; 
    var doc;
      var elementList;
      var commentNode;
      var nodeType;
      var commentNodeName;
      
	   
	   
	doc = docs["staff.xml"]
           elementList = doc.childNodes;

      for(var indexN65600 = 0;indexN65600 < elementList.length; indexN65600++) {
      commentNode = elementList.item(indexN65600);
      nodeType = commentNode.nodeType;

      
	if(
	(8 == nodeType)
	) {
	commentNodeName = commentNode.nodeName;

      jsUnitCore.assertEquals("commentNodeName","#comment",commentNodeName);
       
	}
	
	}
   
})()

