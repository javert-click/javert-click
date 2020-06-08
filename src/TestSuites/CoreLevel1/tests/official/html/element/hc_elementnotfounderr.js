
var docs = initDOMHeapCoreLevel1();
var jsUnitCore = initJsUnitCore();
var DOMTestCase = initDOMTestCase(jsUnitCore);   


/**
* 
    The "removeAttributeNode(oldAttr)" method raises a
   NOT_FOUND_ERR DOMException if the "oldAttr" attribute
   is not an attribute of the element.
    
   Retrieve the last employee and attempt to remove
   a non existing attribute node.  This should cause the
   intended exception to be raised.  This test makes use
   of the "createAttribute(name)" method from the Document 
   interface.

* @author Curt Arnold
* @see http://www.w3.org/TR/1998/REC-DOM-Level-1-19981001/level-one-core#xpointer(id('ID-258A00AF')/constant[@name='INUSE_ATTRIBUTE_ERR'])
* @see http://www.w3.org/TR/1998/REC-DOM-Level-1-19981001/level-one-core#ID-D589198
* @see http://www.w3.org/TR/1998/REC-DOM-Level-1-19981001/level-one-core#xpointer(id('ID-D589198')/raises/exception[@name='DOMException']/descr/p[substring-before(.,':')='INUSE_ATTRIBUTE_ERR'])
* @see http://www.w3.org/Bugs/Public/show_bug.cgi?id=249
*/

     /*
     * @id hc_elementnotfounderr
     */
     (function hc_elementnotfounderr() {
   var success; 
    var doc;
      var oldAttribute;
      var addressElementList;
      var testAddress;
      var attrAddress;
      
	   
	   
	doc = docs["hc_staff.html"]
           addressElementList = doc.getElementsByTagName("acronym");
      testAddress = addressElementList.item(4);
      oldAttribute = doc.createAttribute("title");
      
	{
		success = false;
		try {
            attrAddress = testAddress.removeAttributeNode(oldAttribute);
        }
		catch(ex) {
      success = (typeof(ex.code) != 'undefined' && ex.code == 8);
		}
		jsUnitCore.assertTrue("throw_NOT_FOUND_ERR",success);
	}

})()

