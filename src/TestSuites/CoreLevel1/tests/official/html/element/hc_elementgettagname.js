
var docs = initDOMHeapCoreLevel1();
var jsUnitCore = initJsUnitCore();
var DOMTestCase = initDOMTestCase(jsUnitCore);   


/**
* 
   Invoke the "getTagName()" method one the 
   root node. The value returned should be "html" or "svg". 

* @author Curt Arnold
* @see http://www.w3.org/TR/1998/REC-DOM-Level-1-19981001/level-one-core#ID-104682815
* @see http://www.w3.org/Bugs/Public/show_bug.cgi?id=251
*/

     /*
     * @id hc_elementgettagname
     */
     (function hc_elementgettagname() {
   var success; 
    var doc;
      var root;
      var tagname;
      
	   
	   
	doc = docs["hc_staff.html"]
           root = doc.documentElement;

      tagname = root.tagName;

      
	if(
	
	(doc.doctype.content == "image/svg+xml")

	) {
	jsUnitCore.assertEquals("svgTagname","svg",tagname);
       
	}
	
		else {
			DOMTestCase.assertEqualsAutoCase("element", "tagname","html",tagname);
       
		}
	
})()

