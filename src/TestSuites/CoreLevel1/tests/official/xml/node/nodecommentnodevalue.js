
var docs = initDOMHeapCoreLevel1();
var jsUnitCore = initJsUnitCore();
var DOMTestCase = initDOMTestCase(jsUnitCore);   


/**
* 
    The string returned by the "getNodeValue()" method for a 
    Comment Node is the content of the comment.
    
    Retrieve the comment in the XML file and   
    check the string returned by the "getNodeValue()" method. 
    It should be equal to "This is comment number 1".

* @author NIST
* @author Mary Brady
* @see http://www.w3.org/TR/1998/REC-DOM-Level-1-19981001/level-one-core#ID-F68D080
* @see http://www.w3.org/TR/1998/REC-DOM-Level-1-19981001/level-one-core#ID-1728279322
*/

     /*
     * @id nodecommentnodevalue
     */
     (function nodecommentnodevalue() {
   var success; 
    var doc;
      var elementList;
      var commentNode;
      var commentName;
      var commentValue;
      
	   
	   
	doc = docs["staff.xml"]
           elementList = doc.childNodes;

      for(var indexN65600 = 0;indexN65600 < elementList.length; indexN65600++) {
      commentNode = elementList.item(indexN65600);
      commentName = commentNode.nodeName;

      
	if(
	("#comment" == commentName)
	) {
	commentValue = commentNode.nodeValue;

      jsUnitCore.assertEquals("value"," This is comment number 1.",commentValue);
       
	}
	
	}
   
})()

