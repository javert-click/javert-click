
var docs = initDOMHeapCoreLevel1();
var jsUnitCore = initJsUnitCore();
var DOMTestCase = initDOMTestCase(jsUnitCore);   


/**
* 
    The "setAttributeNode(newAttr)" method raises an 
   "INUSE_ATTRIBUTE_ERR DOMException if the "newAttr" 
   is already an attribute of another element.

* @author Curt Arnold
* @see http://www.w3.org/TR/1998/REC-DOM-Level-1-19981001/level-one-core#xpointer(id('ID-258A00AF')/constant[@name='INUSE_ATTRIBUTE_ERR'])
* @see http://www.w3.org/TR/1998/REC-DOM-Level-1-19981001/level-one-core#ID-887236154
* @see http://www.w3.org/TR/1998/REC-DOM-Level-1-19981001/level-one-core#xpointer(id('ID-887236154')/raises/exception[@name='DOMException']/descr/p[substring-before(.,':')='INUSE_ATTRIBUTE_ERR'])
* @see http://www.w3.org/Bugs/Public/show_bug.cgi?id=244
*/

     /*
     * @id hc_elementinuseattributeerr
     */
     (function hc_elementinuseattributeerr() {
   var success; 
    var doc;
      var newAttribute;
      var addressElementList;
      var testAddress;
      var newElement;
      var attrAddress;
      var appendedChild;
      var setAttr1;
      var setAttr2;
      
	   
	   
	doc = docs["hc_staff.html"]
           addressElementList = doc.getElementsByTagName("body");
      testAddress = addressElementList.item(0);
      newElement = doc.createElement("p");
      appendedChild = testAddress.appendChild(newElement);
      newAttribute = doc.createAttribute("title");
      setAttr1 = newElement.setAttributeNode(newAttribute);
      
	{
		success = false;
		try {
            setAttr2 = testAddress.setAttributeNode(newAttribute);
        }
		catch(ex) {
      success = (typeof(ex.code) != 'undefined' && ex.code == 10);
		}
		jsUnitCore.assertTrue("throw_INUSE_ATTRIBUTE_ERR",success);
	}

})()

