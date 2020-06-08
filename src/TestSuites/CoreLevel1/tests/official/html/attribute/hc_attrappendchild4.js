
var docs = initDOMHeapCoreLevel1();
var jsUnitCore = initJsUnitCore();
var DOMTestCase = initDOMTestCase(jsUnitCore);   


/**
* 
Attempt to append a CDATASection to an attribute which should result
in a HIERARCHY_REQUEST_ERR.

* @author Curt Arnold
* @see http://www.w3.org/TR/1998/REC-DOM-Level-1-19981001/level-one-core#ID-637646024
* @see http://www.w3.org/TR/1998/REC-DOM-Level-1-19981001/level-one-core#ID-184E7107
*/

     /*
     * @id hc_attrappendchild4
     */
     (function hc_attrappendchild4() {
   var success; 
    var doc;
      var acronymList;
      var testNode;
      var attributes;
      var titleAttr;
      var value;
      var textNode;
      var retval;
      var lastChild;
      
	   
	   
	doc = docs["hc_staff.html"]
           acronymList = doc.getElementsByTagName("acronym");
      testNode = acronymList.item(3);
      attributes = testNode.attributes;

      titleAttr = attributes.getNamedItem("title");
      
	if(
	
	(doc.doctype.content == "text/html")

	) {
	
	{
		success = false;
		try {
            textNode = doc.createCDATASection("terday");
        }
		catch(ex) {
      success = (typeof(ex.code) != 'undefined' && ex.code == 9);
		}
		jsUnitCore.assertTrue("throw_NOT_SUPPORTED_ERR",success);
	}

	}
	
		else {
			textNode = doc.createCDATASection("terday");
      
	{
		success = false;
		try {
            retval = titleAttr.appendChild(textNode);
        }
		catch(ex) {
      success = (typeof(ex.code) != 'undefined' && ex.code == 3);
		}
		jsUnitCore.assertTrue("throw_HIERARCHY_REQUEST_ERR",success);
	}

		}
	
})()

