
var docs = initDOMHeapCoreLevel1();
var jsUnitCore = initJsUnitCore();
var DOMTestCase = initDOMTestCase(jsUnitCore);   


/**
* 
Checks the value of an attribute that contains entity references.

* @author Curt Arnold
* @see http://www.w3.org/TR/1998/REC-DOM-Level-1-19981001/level-one-core#ID-221662474
*/

     /*
     * @id hc_attrgetvalue2
     */
     (function hc_attrgetvalue2() {
   var success; 
    var doc;
      var acronymList;
      var testNode;
      var attributes;
      var titleAttr;
      var value;
      var textNode;
      var retval;
      var firstChild;
      var alphaRef;
      
	   
	   
	doc = docs["hc_staff.html"]
           acronymList = doc.getElementsByTagName("acronym");
      testNode = acronymList.item(3);
      attributes = testNode.attributes;

      titleAttr = attributes.getNamedItem("class");
      
	if(
	
	(doc.doctype.content == "text/html")

	) {
	
	{
		success = false;
		try {
            alphaRef = doc.createEntityReference("alpha");
        }
		catch(ex) {
      success = (typeof(ex.code) != 'undefined' && ex.code == 9);
		}
		jsUnitCore.assertTrue("throw_NOT_SUPPORTED_ERR",success);
	}

	}
	
		else {
			alphaRef = doc.createEntityReference("alpha");
      firstChild = titleAttr.firstChild;

      retval = titleAttr.insertBefore(alphaRef,firstChild);
      value = titleAttr.value;

      jsUnitCore.assertEquals("attrValue1","αYα",value);
       
		}
	
})()

