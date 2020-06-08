
var docs = initDOMHeapCoreLevel1();
var jsUnitCore = initJsUnitCore();
var DOMTestCase = initDOMTestCase(jsUnitCore);   


/**
* 
    The "setNamedItem(arg)" method raises a 
   WRONG_DOCUMENT_ERR DOMException if "arg" was created
   from a different document than the one that created
   the NamedNodeMap. 
   
   Create a NamedNodeMap object from the attributes of the
   last child of the third employee and attempt to add
   another Attr node to it that was created from a 
   different DOM document.  This should raise the desired
   exception.  This method uses the "createAttribute(name)"
   method from the Document interface.

* @author Curt Arnold
* @see http://www.w3.org/TR/1998/REC-DOM-Level-1-19981001/level-one-core#xpointer(id('ID-258A00AF')/constant[@name='WRONG_DOCUMENT_ERR'])
* @see http://www.w3.org/TR/1998/REC-DOM-Level-1-19981001/level-one-core#ID-1025163788
* @see http://www.w3.org/TR/1998/REC-DOM-Level-1-19981001/level-one-core#xpointer(id('ID-1025163788')/raises/exception[@name='DOMException']/descr/p[substring-before(.,':')='WRONG_DOCUMENT_ERR'])
* @see http://www.w3.org/Bugs/Public/show_bug.cgi?id=249
*/

     /*
     * @id hc_namednodemapwrongdocumenterr
     */
     (function hc_namednodemapwrongdocumenterr() {
   var success; 
    var doc1;
      var doc2;
      var elementList;
      var testAddress;
      var attributes;
      var newAttribute;
      var strong;
      var setNode;
      
	   
	   
	//doc1 = docload.loadDocument("hc_staff.html")
           
	   
	   
    //doc2 = docload.loadDocument("hc_staff.html")
    doc1 = docs["hc_staff.html"];
    doc2 = doc1.cloneNode(true);
           elementList = doc1.getElementsByTagName("acronym");
      testAddress = elementList.item(2);
      newAttribute = doc2.createAttribute("newAttribute");
      attributes = testAddress.attributes;

      
	{
		success = false;
		try {
            setNode = attributes.setNamedItem(newAttribute);
        }
		catch(ex) {
      success = (typeof(ex.code) != 'undefined' && ex.code == 4);
		}
		jsUnitCore.assertTrue("throw_WRONG_DOCUMENT_ERR",success);
	}

})()

