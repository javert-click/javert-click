
var docs = initDOMHeapCoreLevel1();
var jsUnitCore = initJsUnitCore();
var DOMTestCase = initDOMTestCase(jsUnitCore);   


/**
* 
    The "removeAttribute(name)" method for an attribute causes the 
   DOMException NO_MODIFICATION_ALLOWED_ERR to be raised
   if the node is readonly.
   
   Create an reference the entity ent4 and add it to the THIRD "gender" element.  
   Try to remove the "domestic" attribute from the entity reference by executing the "removeAttribute(name)" method.
   This causes a NO_MODIFICATION_ALLOWED_ERR DOMException to be thrown.

* @author Curt Arnold
* @see http://www.w3.org/TR/1998/REC-DOM-Level-1-19981001/level-one-core#xpointer(id('ID-258A00AF')/constant[@name='NO_MODIFICATION_ALLOWED_ERR'])
* @see http://www.w3.org/TR/1998/REC-DOM-Level-1-19981001/level-one-core#ID-6D6AC0F9
* @see http://www.w3.org/TR/1998/REC-DOM-Level-1-19981001/level-one-core#xpointer(id('ID-6D6AC0F9')/raises/exception[@name='DOMException']/descr/p[substring-before(.,':')='NO_MODIFICATION_ALLOWED_ERR'])
* @see http://www.w3.org/TR/1998/REC-DOM-Level-1-19981001/level-one-core#ID-6D6AC0F9
* @see http://www.w3.org/2001/DOM-Test-Suite/level1/core/elementremoveattributenomodificationallowederr.xml
*/

     /*
     * @id elementremoveattributenomodificationallowederrEE
     */
     (function elementremoveattributenomodificationallowederrEE() {
   var success; 
    var doc;
      var genderList;
      var gender;
      var entRef;
      var entElement;
      var appendedChild;
      
	   
	   
	doc = docs["staff.xml"]
           genderList = doc.getElementsByTagName("gender");
      gender = genderList.item(2);
      entRef = doc.createEntityReference("ent4");
      jsUnitCore.assertNotNull("createdEntRefNotNull",entRef);
appendedChild = gender.appendChild(entRef);
      entElement = entRef.firstChild;

      jsUnitCore.assertNotNull("entElementNotNull",entElement);

	{
		success = false;
		try {
            entElement.removeAttribute("domestic");
        }
		catch(ex) {
      success = (typeof(ex.code) != 'undefined' && ex.code == 7);
		}
		jsUnitCore.assertTrue("throw_NO_MODIFICATION_ALLOWED_ERR",success);
	}

})()

