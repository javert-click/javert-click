
var docs = initDOMHeapCoreLevel1();
var jsUnitCore = initJsUnitCore();
var DOMTestCase = initDOMTestCase(jsUnitCore);   


/**
* 
Attempts to append an element to the child nodes of an attribute.

* @author Curt Arnold
* @see http://www.w3.org/TR/1998/REC-DOM-Level-1-19981001/level-one-core#ID-637646024
* @see http://www.w3.org/TR/1998/REC-DOM-Level-1-19981001/level-one-core#ID-184E7107
*/

     /*
     * @id hc_attrappendchild2
     */
     (function hc_attrappendchild2() {
   var success; 
    var doc;
      var acronymList;
      var testNode;
      var attributes;
      var titleAttr;
      var value;
      var newChild;
      var retval;
      var lastChild;
      
	   
	   
	doc = docs["hc_staff.html"]
           acronymList = doc.getElementsByTagName("acronym");
      testNode = acronymList.item(3);
      attributes = testNode.attributes;

      titleAttr = attributes.getNamedItem("title");
      newChild = doc.createElement("terday");
      
	{
		success = false;
		try {
            retval = titleAttr.appendChild(newChild);
        }
		catch(ex) {
      success = (typeof(ex.code) != 'undefined' && ex.code == 3);
		}
		jsUnitCore.assertTrue("throw_HIERARCHY_REQUEST_ERR",success);
	}

})()

