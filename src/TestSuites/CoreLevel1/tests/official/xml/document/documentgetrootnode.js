
var docs = initDOMHeapCoreLevel1();
var jsUnitCore = initJsUnitCore();
var DOMTestCase = initDOMTestCase(jsUnitCore);   


/**
* 
    The "getDocumentElement()" method provides direct access 
   to the child node that is the root element of the document.
   Retrieve the entire DOM document and invoke its 
   "getDocumentElement()" method.  It should return an
   Element node whose NodeName is "staff" (or "svg").

* @author NIST
* @author Mary Brady
* @see http://www.w3.org/TR/1998/REC-DOM-Level-1-19981001/level-one-core#ID-87CD092
* @see http://www.w3.org/Bugs/Public/show_bug.cgi?id=251
*/

     /*
     * @id documentgetrootnode
     */
     (function documentgetrootnode() {
   var success; 
    var doc;
      var root;
      var rootName;
      
	   
	   
	doc = docs["staff.xml"]
           root = doc.documentElement;

      rootName = root.nodeName;

      
	if(
	
	(doc.doctype.content == "image/svg+xml")

	) {
	jsUnitCore.assertEquals("svgRootNode","svg",rootName);
       
	}
	
		else {
			jsUnitCore.assertEquals("documentGetRootNodeAssert","staff",rootName);
       
		}
	
})()

