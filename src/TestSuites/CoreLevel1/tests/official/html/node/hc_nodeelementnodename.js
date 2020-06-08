
var docs = initDOMHeapCoreLevel1();
var jsUnitCore = initJsUnitCore();
var DOMTestCase = initDOMTestCase(jsUnitCore);   


/**
* 
    Retrieve the first Element Node(Root Node) of the   
    DOM object and check the string returned by the            
    "getNodeName()" method.   It should be equal to its
    tagName. 

* @author Curt Arnold
* @see http://www.w3.org/TR/1998/REC-DOM-Level-1-19981001/level-one-core#ID-F68D095
* @see http://www.w3.org/Bugs/Public/show_bug.cgi?id=251
*/

     /*
     * @id hc_nodeelementnodename
     */
     (function hc_nodeelementnodename() {
   var success; 
    var doc;
      var elementNode;
      var elementName;
      
	   
	   
	doc = docs["hc_staff.html"]
           elementNode = doc.documentElement;

      elementName = elementNode.nodeName;

      
	if(
	
	(doc.doctype.content == "image/svg+xml")

	) {
	jsUnitCore.assertEquals("svgNodeName","svg",elementName);
       
	}
	
		else {
			DOMTestCase.assertEqualsAutoCase("element", "nodeName","html",elementName);
       
		}
	
})()

