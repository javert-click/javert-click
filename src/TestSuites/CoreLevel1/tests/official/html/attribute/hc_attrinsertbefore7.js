
var docs = initDOMHeapCoreLevel1();
var jsUnitCore = initJsUnitCore();
var DOMTestCase = initDOMTestCase(jsUnitCore);   


/**
* 
Appends a document fragment containing a CDATASection to an attribute.

* @author Curt Arnold
* @see http://www.w3.org/TR/1998/REC-DOM-Level-1-19981001/level-one-core#ID-637646024
* @see http://www.w3.org/TR/1998/REC-DOM-Level-1-19981001/level-one-core#ID-952280727
*/

     /*
     * @id hc_attrinsertbefore7
     */
     (function hc_attrinsertbefore7() {
   var success; 
    var doc;
      var acronymList;
      var testNode;
      var attributes;
      var titleAttr;
      var value;
      var terNode;
      var dayNode;
      var docFrag;
      var retval;
      var firstChild;
      var lastChild;
      var refChild = null;

      
	   
	   
	doc = docs["hc_staff.html"]
           acronymList = doc.getElementsByTagName("acronym");
      testNode = acronymList.item(3);
      attributes = testNode.attributes;

      titleAttr = attributes.getNamedItem("title");
      terNode = doc.createTextNode("ter");
      
	if(
	
	(doc.doctype.content == "text/html")

	) {
	
	{
		success = false;
		try {
            dayNode = doc.createCDATASection("day");
        }
		catch(ex) {
      success = (typeof(ex.code) != 'undefined' && ex.code == 9);
		}
		jsUnitCore.assertTrue("throw_NOT_SUPPORTED_ERR",success);
	}

	}
	
		else {
			dayNode = doc.createCDATASection("day");
      docFrag = doc.createDocumentFragment();
      retval = docFrag.appendChild(terNode);
      retval = docFrag.appendChild(dayNode);
      
	{
		success = false;
		try {
            retval = titleAttr.insertBefore(docFrag,refChild);
        }
		catch(ex) {
      success = (typeof(ex.code) != 'undefined' && ex.code == 3);
		}
		jsUnitCore.assertTrue("throw_HIERARCHY_REQUEST_ERR",success);
	}

		}
	
})()

