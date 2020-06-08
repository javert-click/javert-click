
var docs = initDOMHeapCoreLevel1();
var jsUnitCore = initJsUnitCore();
var DOMTestCase = initDOMTestCase(jsUnitCore);   


/**
* 
Attempt to append a text node from another document to an attribute which should result
in a WRONG_DOCUMENT_ERR.

* @author Curt Arnold
* @see http://www.w3.org/TR/1998/REC-DOM-Level-1-19981001/level-one-core#ID-637646024
* @see http://www.w3.org/TR/1998/REC-DOM-Level-1-19981001/level-one-core#ID-952280727
*/

     /*
     * @id hc_attrinsertbefore6
     */
     (function hc_attrinsertbefore6() {
   var success; 
    var doc;
      var acronymList;
      var testNode;
      var attributes;
      var titleAttr;
      var value;
      var textNode;
      var retval;
      var refChild = null;

      var otherDoc;
      
	   
	   
	doc = docs["hc_staff.html"]
           
	   
	   
      //otherDoc = docload.loadDocument("hc_staff.html")
      otherDoc = doc.cloneNode(true);
           acronymList = doc.getElementsByTagName("acronym");
      testNode = acronymList.item(3);
      attributes = testNode.attributes;

      titleAttr = attributes.getNamedItem("title");
      textNode = otherDoc.createTextNode("terday");
      
	{
		success = false;
		try {
            retval = titleAttr.insertBefore(textNode,refChild);
        }
		catch(ex) {
      success = (typeof(ex.code) != 'undefined' && ex.code == 4);
		}
		jsUnitCore.assertTrue("throw_WRONG_DOCUMENT_ERR",success);
	}

})()

