
var docs = initDOMHeapCoreLevel1();
var jsUnitCore = initJsUnitCore();
var DOMTestCase = initDOMTestCase(jsUnitCore);   


/**
* 
    The "setAttributeNode(newAttr)" method raises an 
   "INUSE_ATTRIBUTE_ERR DOMException if the "newAttr" 
   is already an attribute of another element.
   
   Retrieve the last child of the second employee and append
   a newly created element.  The "createAttribute(name)"
   and "setAttributeNode(newAttr)" methods are invoked
   to create and add a new attribute to the newly created
   Element.  The "setAttributeNode(newAttr)" method is
   once again called to add the new attribute causing an
   exception to be raised since the attribute is already
   an attribute of another element.

* @author NIST
* @author Mary Brady
* @see http://www.w3.org/TR/1998/REC-DOM-Level-1-19981001/level-one-core#xpointer(id('ID-258A00AF')/constant[@name='INUSE_ATTRIBUTE_ERR'])
* @see http://www.w3.org/TR/1998/REC-DOM-Level-1-19981001/level-one-core#ID-887236154
* @see http://www.w3.org/TR/1998/REC-DOM-Level-1-19981001/level-one-core#xpointer(id('ID-887236154')/raises/exception[@name='DOMException']/descr/p[substring-before(.,':')='INUSE_ATTRIBUTE_ERR'])
*/

     /*
     * @id elementinuseattributeerr
     */
     (function elementinuseattributeerr() {
   var success; 
    var doc;
      var newAttribute;
      var addressElementList;
      var testAddress;
      var newElement;
      var appendedChild;
      var setAttr1;
      var setAttr2;
      
	   
	   
	doc = docs["staff.xml"]
           addressElementList = doc.getElementsByTagName("address");
      testAddress = addressElementList.item(1);
      newElement = doc.createElement("newElement");
      appendedChild = testAddress.appendChild(newElement);
      newAttribute = doc.createAttribute("newAttribute");
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

