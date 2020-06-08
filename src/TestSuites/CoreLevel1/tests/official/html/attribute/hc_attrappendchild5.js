
var docs = initDOMHeapCoreLevel1();
var jsUnitCore = initJsUnitCore();
var DOMTestCase = initDOMTestCase(jsUnitCore);   


/**
* 
Attempt to append a node from another document to an attribute which should result
in a WRONG_DOCUMENT_ERR.

* @author Curt Arnold
* @see http://www.w3.org/TR/1998/REC-DOM-Level-1-19981001/level-one-core#ID-637646024
* @see http://www.w3.org/TR/1998/REC-DOM-Level-1-19981001/level-one-core#ID-184E7107
*/

     /*
     * @id hc_attrappendchild5
     */
     (function hc_attrappendchild5() {
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
      var otherDoc;
      
	   
	   
	doc = docs["hc_staff.html"]
           
	   
	otherDoc = doc.cloneNode(true);
	//otherDoc = docload.loadDocument("hc_staff.html")
           acronymList = doc.getElementsByTagName("acronym");
      testNode = acronymList.item(3);
      attributes = testNode.attributes;

      titleAttr = attributes.getNamedItem("title");
      textNode = otherDoc.createTextNode("terday");
      
	{
		success = false;
		try {
            retval = titleAttr.appendChild(textNode);
        }
		catch(ex) {
      success = (typeof(ex.code) != 'undefined' && ex.code == 4);
		}
		jsUnitCore.assertTrue("throw_WRONG_DOCUMENT_ERR",success);
	}

})()

