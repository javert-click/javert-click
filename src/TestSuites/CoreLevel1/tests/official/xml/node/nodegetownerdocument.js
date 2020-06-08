
var docs = initDOMHeapCoreLevel1();
var jsUnitCore = initJsUnitCore();
var DOMTestCase = initDOMTestCase(jsUnitCore);   


/**
* 
    The "getOwnerDocument()" method returns the Document
    object associated with this node.
    
    Retrieve the second employee and examine Document 
    returned by the "getOwnerDocument()" method.   Invoke
    the "getDocumentElement()" on the Document which will
    return an Element that is equal to "staff".

* @author NIST
* @author Mary Brady
* @see http://www.w3.org/TR/1998/REC-DOM-Level-1-19981001/level-one-core#node-ownerDoc
* @see http://www.w3.org/Bugs/Public/show_bug.cgi?id=251
*/

     /*
     * @id nodegetownerdocument
     */
     (function nodegetownerdocument() {
   var success; 
    var doc;
      var elementList;
      var docNode;
      var ownerDocument;
      var docElement;
      var elementName;
      
	   
	   
	doc = docs["staff.xml"]
           elementList = doc.getElementsByTagName("employee");
      docNode = elementList.item(1);
      ownerDocument = docNode.ownerDocument;

      docElement = ownerDocument.documentElement;

      elementName = docElement.nodeName;

      
	if(
	
	(doc.doctype.content == "image/svg+xml")

	) {
	jsUnitCore.assertEquals("svgTagName","svg",elementName);
       
	}
	
		else {
			jsUnitCore.assertEquals("nodeGetOwnerDocumentAssert1","staff",elementName);
       
		}
	
})()

