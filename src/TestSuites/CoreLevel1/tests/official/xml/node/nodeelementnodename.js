
var docs = initDOMHeapCoreLevel1();
var jsUnitCore = initJsUnitCore();
var DOMTestCase = initDOMTestCase(jsUnitCore);   


/**
* 

    The string returned by the "getNodeName()" method for an 

    Element Node is its tagName. 

    

    Retrieve the first Element Node(Root Node) of the   

    DOM object and check the string returned by the            

    "getNodeName()" method.   It should be equal to its

    tagName. 


* @author NIST
* @author Mary Brady
* @see http://www.w3.org/TR/1998/REC-DOM-Level-1-19981001/level-one-core#ID-F68D095
* @see http://www.w3.org/Bugs/Public/show_bug.cgi?id=251
*/

     /*
     * @id nodeelementnodename
     */
     (function nodeelementnodename() {
   var success; 
    var doc;
      var elementNode;
      var elementName;
      
	   
	   
	doc = docs["staff.xml"]
           elementNode = doc.documentElement;

      elementName = elementNode.nodeName;

      
	if(
	
	(doc.doctype.content == "image/svg+xml")

	) {
	jsUnitCore.assertEquals("svgNodeName","svg",elementName);
       
	}
	
		else {
			jsUnitCore.assertEquals("nodeElementNodeNameAssert1","staff",elementName);
       
		}
	
})()

