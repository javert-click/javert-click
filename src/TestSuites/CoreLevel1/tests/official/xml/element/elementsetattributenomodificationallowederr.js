
var docs = initDOMHeapCoreLevel1();
var jsUnitCore = initJsUnitCore();
var DOMTestCase = initDOMTestCase(jsUnitCore);   


/**
* 
    The "setAttribute(name,value)" method for an attribute causes the 
   DOMException NO_MODIFICATION_ALLOWED_ERR to be raised
   if the node is readonly.
   
   Obtain the children of the THIRD "gender" element.  The elements
   content is an entity reference.  Try to remove the "domestic" attribute
   from the entity reference by executing the "setAttribute(name,value)" method.
   This causes a NO_MODIFICATION_ALLOWED_ERR DOMException to be thrown.

* @author NIST
* @author Mary Brady
* @see http://www.w3.org/TR/1998/REC-DOM-Level-1-19981001/level-one-core#xpointer(id('ID-258A00AF')/constant[@name='NO_MODIFICATION_ALLOWED_ERR'])
* @see http://www.w3.org/TR/1998/REC-DOM-Level-1-19981001/level-one-core#ID-F68F082
* @see http://www.w3.org/TR/1998/REC-DOM-Level-1-19981001/level-one-core#xpointer(id('ID-F68F082')/raises/exception[@name='DOMException']/descr/p[substring-before(.,':')='NO_MODIFICATION_ALLOWED_ERR'])
* @see http://www.w3.org/TR/1998/REC-DOM-Level-1-19981001/level-one-core#ID-F68F082
*/

     /*
     * @id elementsetattributenomodificationallowederr
     */
     (function elementsetattributenomodificationallowederr() {
   var success; 
    var doc;
      var genderList;
      var gender;
      var entRef;
      var entElement;
      
	   
	   
	doc = docs["staff.xml"]
           genderList = doc.getElementsByTagName("gender");
      gender = genderList.item(2);
      entRef = gender.firstChild;

      jsUnitCore.assertNotNull("entRefNotNull",entRef);
entElement = entRef.firstChild;

      jsUnitCore.assertNotNull("entElementNotNull",entElement);

	{
		success = false;
		try {
            entElement.setAttribute("newAttr","newValue");
        }
		catch(ex) {
      success = (typeof(ex.code) != 'undefined' && ex.code == 7);
		}
		jsUnitCore.assertTrue("throw_NO_MODIFICATION_ALLOWED_ERR",success);
	}

})()

