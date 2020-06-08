
var docs = initDOMHeapCoreLevel1();
var jsUnitCore = initJsUnitCore();
var DOMTestCase = initDOMTestCase(jsUnitCore);   


/**
* 
Evaluate Node.ownerDocument on the second "p" element.

* @author Curt Arnold
* @see http://www.w3.org/TR/1998/REC-DOM-Level-1-19981001/level-one-core#node-ownerDoc
* @see http://www.w3.org/Bugs/Public/show_bug.cgi?id=251
*/

     /*
     * @id hc_nodegetownerdocument
     */
     (function hc_nodegetownerdocument() {
   var success; 
    var doc;
      var elementList;
      var docNode;
      var ownerDocument;
      var docElement;
      var elementName;
      
	   
	   
	doc = docs["hc_staff.html"]
           elementList = doc.getElementsByTagName("p");
      docNode = elementList.item(1);
      ownerDocument = docNode.ownerDocument;

      docElement = ownerDocument.documentElement;

      elementName = docElement.nodeName;

      
	if(
	
	(doc.doctype.content == "image/svg+xml")

	) {
	jsUnitCore.assertEquals("svgNodeName","svg",elementName);
       
	}
	
		else {
			DOMTestCase.assertEqualsAutoCase("element", "ownerDocElemTagName","html",elementName);
       
		}
	
})()

