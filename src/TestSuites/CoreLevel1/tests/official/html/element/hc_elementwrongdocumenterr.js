
var docs = initDOMHeapCoreLevel1();
var jsUnitCore = initJsUnitCore();
var DOMTestCase = initDOMTestCase(jsUnitCore);   


/**
* 
    The "setAttributeNode(newAttr)" method raises an 
   "WRONG_DOCUMENT_ERR DOMException if the "newAttr" 
   was created from a different document than the one that
   created this document.

   Retrieve the last employee and attempt to set a new
   attribute node for its "employee" element.  The new
   attribute was created from a document other than the
   one that created this element, therefore a
   WRONG_DOCUMENT_ERR DOMException should be raised.

   This test uses the "createAttribute(newAttr)" method
   from the Document interface.

* @author Curt Arnold
* @see http://www.w3.org/TR/1998/REC-DOM-Level-1-19981001/level-one-core#xpointer(id('ID-258A00AF')/constant[@name='WRONG_DOCUMENT_ERR'])
* @see http://www.w3.org/TR/1998/REC-DOM-Level-1-19981001/level-one-core#ID-887236154
* @see http://www.w3.org/TR/1998/REC-DOM-Level-1-19981001/level-one-core#xpointer(id('ID-887236154')/raises/exception[@name='DOMException']/descr/p[substring-before(.,':')='WRONG_DOCUMENT_ERR'])
* @see http://www.w3.org/Bugs/Public/show_bug.cgi?id=249
*/

     /*
     * @id hc_elementwrongdocumenterr
     */
     (function hc_elementwrongdocumenterr() {
   var success; 
    var doc1;
      var doc2;
      var newAttribute;
      var addressElementList;
      var testAddress;
      var attrAddress;
      
	   
	   
    //doc1 = docload.loadDocument("hc_staff.html")
           
    doc1 = docs["hc_staff.html"];
    doc2 = doc1.cloneNode(true);   
	   
	//doc2 = docload.loadDocument("hc_staff.html")
           newAttribute = doc2.createAttribute("newAttribute");
      addressElementList = doc1.getElementsByTagName("acronym");
      testAddress = addressElementList.item(4);
      
	{
		success = false;
		try {
            attrAddress = testAddress.setAttributeNode(newAttribute);
        }
		catch(ex) {
      success = (typeof(ex.code) != 'undefined' && ex.code == 4);
		}
		jsUnitCore.assertTrue("throw_WRONG_DOCUMENT_ERR",success);
	}

})()

