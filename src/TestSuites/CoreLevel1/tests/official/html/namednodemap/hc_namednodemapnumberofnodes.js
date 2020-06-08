
var docs = initDOMHeapCoreLevel1();
var jsUnitCore = initJsUnitCore();
var DOMTestCase = initDOMTestCase(jsUnitCore);   


/**
* 
   Retrieve the second "p" element and evaluate Node.attributes.length.

* @author Curt Arnold
* @see http://www.w3.org/TR/1998/REC-DOM-Level-1-19981001/level-one-core#ID-84CF096
* @see http://www.w3.org/TR/1998/REC-DOM-Level-1-19981001/level-one-core#ID-6D0FB19E
* @see http://www.w3.org/Bugs/Public/show_bug.cgi?id=250
*/

     /*
     * @id hc_namednodemapnumberofnodes
     */
     (function hc_namednodemapnumberofnodes() {
   var success; 
    var doc;
      var elementList;
      var testEmployee;
      var attributes;
      var length;
      
	   
	   
	doc = docs["hc_staff.html"]
           elementList = doc.getElementsByTagName("acronym");
      testEmployee = elementList.item(2);
      attributes = testEmployee.attributes;

      length = attributes.length;

      
	if(
	
	(doc.doctype.content == "text/html")

	) {
	jsUnitCore.assertEquals("htmlLength",2,length);
       
	}
	
		else {
			jsUnitCore.assertEquals("length",3,length);
       
		}
	
})()

