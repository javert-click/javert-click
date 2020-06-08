
var docs = initDOMHeapCoreLevel1();
var jsUnitCore = initJsUnitCore();
var DOMTestCase = initDOMTestCase(jsUnitCore);   


/**
* 
   Create a NamedNodeMap object from the attributes of the
   last child of the third "p" element and traverse the
   list from index 0 thru length -1.  All indices should
   be valid.

* @author Curt Arnold
* @see http://www.w3.org/TR/1998/REC-DOM-Level-1-19981001/level-one-core#ID-84CF096
* @see http://www.w3.org/TR/1998/REC-DOM-Level-1-19981001/level-one-core#ID-349467F9
* @see http://www.w3.org/TR/1998/REC-DOM-Level-1-19981001/level-one-core#ID-6D0FB19E
* @see http://www.w3.org/Bugs/Public/show_bug.cgi?id=250
*/

     /*
     * @id hc_namednodemapchildnoderange
     */
     (function hc_namednodemapchildnoderange() {
   var success; 
    var doc;
      var elementList;
      var testEmployee;
      var attributes;
      var child;
      var strong;
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
       child = attributes.item(2);
      jsUnitCore.assertNotNull("attr2",child);

		}
	child = attributes.item(0);
      jsUnitCore.assertNotNull("attr0",child);
child = attributes.item(1);
      jsUnitCore.assertNotNull("attr1",child);
child = attributes.item(3);
      jsUnitCore.assertNull("attr3",child);
    
})()

