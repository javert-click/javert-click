
var docs = initDOMHeapCoreLevel1();
var jsUnitCore = initJsUnitCore();
var DOMTestCase = initDOMTestCase(jsUnitCore);   


/**
* 

    The "getTagName()" method returns the 

   tagName of an element.    

   

   Invoke the "getTagName()" method one the 

   root node. The value returned should be "staff". 


* @author NIST
* @author Mary Brady
* @see http://www.w3.org/TR/1998/REC-DOM-Level-1-19981001/level-one-core#ID-104682815
* @see http://www.w3.org/Bugs/Public/show_bug.cgi?id=251
*/

     /*
     * @id elementgettagname
     */
     (function elementgettagname() {
   var success; 
    var doc;
      var root;
      var tagname;
      
	   
	   
	doc = docs["staff.xml"]
           root = doc.documentElement;

      tagname = root.tagName;

      
	if(
	
	(doc.doctype.content == "image/svg+xml")

	) {
	jsUnitCore.assertEquals("svgTagName","svg",tagname);
       
	}
	
		else {
			jsUnitCore.assertEquals("elementGetTagNameAssert","staff",tagname);
       
		}
	
})()

