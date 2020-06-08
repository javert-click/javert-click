
var docs = initDOMHeapCoreLevel1();
var jsUnitCore = initJsUnitCore();
var DOMTestCase = initDOMTestCase(jsUnitCore);   


/**
* 
    The "setAttributeNode(newAttr)" method for an attribute causes the 
   DOMException NO_MODIFICATION_ALLOWED_ERR to be raised
   if the node is readonly.
   
   Create an entity reference and add to the THIRD "gender" element.  The elements
   content is an entity reference.  Try to remove the "domestic" attribute
   from the entity reference by executing the "setAttributeNode(newAttr)" method.
   This causes a NO_MODIFICATION_ALLOWED_ERR DOMException to be thrown.

* @author Curt Arnold
* @see http://www.w3.org/TR/1998/REC-DOM-Level-1-19981001/level-one-core#xpointer(id('ID-258A00AF')/constant[@name='NO_MODIFICATION_ALLOWED_ERR'])
* @see http://www.w3.org/TR/1998/REC-DOM-Level-1-19981001/level-one-core#ID-887236154
* @see http://www.w3.org/TR/1998/REC-DOM-Level-1-19981001/level-one-core#xpointer(id('ID-887236154')/raises/exception[@name='DOMException']/descr/p[substring-before(.,':')='NO_MODIFICATION_ALLOWED_ERR'])
* @see http://www.w3.org/TR/1998/REC-DOM-Level-1-19981001/level-one-core#ID-887236154
* @see http://www.w3.org/2001/DOM-Test-Suite/level1/core/elementsetattributenodenomodificationallowederr.xml
*/

     /*
     * @id elementsetattributenodenomodificationallowederrEE
     */
     (function elementsetattributenodenomodificationallowederrEE() {
   var success; 
    var doc;
      var genderList;
      var gender;
      var entRef;
      var entElement;
      var newAttr;
      var badAttr;
      var appendedChild;
      
	   
	   
	doc = docs["staff.xml"]
           genderList = doc.getElementsByTagName("gender");
      gender = genderList.item(2);
      entRef = doc.createEntityReference("ent4");
      jsUnitCore.assertNotNull("createdEntRefNotNull",entRef);
appendedChild = gender.appendChild(entRef);
      entElement = entRef.firstChild;

      jsUnitCore.assertNotNull("entElementNotNull",entElement);
newAttr = doc.createAttribute("newAttr");
      
	{
		success = false;
		try {
            badAttr = entElement.setAttributeNode(newAttr);
        }
		catch(ex) {
      success = (typeof(ex.code) != 'undefined' && ex.code == 7);
		}
		jsUnitCore.assertTrue("throw_NO_MODIFICATION_ALLOWED_ERR",success);
	}

})()

