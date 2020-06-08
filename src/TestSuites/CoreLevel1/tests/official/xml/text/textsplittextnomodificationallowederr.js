
var docs = initDOMHeapCoreLevel1();
var jsUnitCore = initJsUnitCore();
var DOMTestCase = initDOMTestCase(jsUnitCore);   


/**
* 
    The "splitText(offset)" method raises a 
    NO_MODIFICATION_ALLOWED_ERR DOMException if the
    node is readonly.
     
    Obtain the children of the THIRD "gender" element.   The elements
    content is an entity reference.   Get the element content of the FIRST
    Text Node of the entity reference and execute the "splitText(offset)" method.
    This causes a NO_MODIFICATION_ALLOWED_ERR DOMException to be thrown.

* @author NIST
* @author Mary Brady
* @see http://www.w3.org/TR/1998/REC-DOM-Level-1-19981001/level-one-core#xpointer(id('ID-258A00AF')/constant[@name='NO_MODIFICATION_ALLOWED_ERR'])
* @see http://www.w3.org/TR/1998/REC-DOM-Level-1-19981001/level-one-core#ID-38853C1D
* @see http://www.w3.org/TR/1998/REC-DOM-Level-1-19981001/level-one-core#xpointer(id('ID-38853C1D')/raises/exception[@name='DOMException']/descr/p[substring-before(.,':')='NO_MODIFICATION_ALLOWED_ERR'])
* @see http://www.w3.org/TR/1998/REC-DOM-Level-1-19981001/level-one-core#ID-38853C1D
*/

     /*
     * @id textsplittextnomodificationallowederr
     */
     (function textsplittextnomodificationallowederr() {
   var success; 
    var doc;
      var genderList;
      var gender;
      var entRef;
      var entElement;
      var entElementText;
      var splitNode;
      var nodeType;
      
	   
	   
	doc = docs["staff.xml"]
           genderList = doc.getElementsByTagName("gender");
      gender = genderList.item(2);
      entRef = gender.firstChild;

      jsUnitCore.assertNotNull("entRefNotNull",entRef);
nodeType = entRef.nodeType;

      
	if(
	(1 == nodeType)
	) {
	entRef = doc.createEntityReference("ent4");
      jsUnitCore.assertNotNull("createdEntRefNotNull",entRef);

	}
	entElement = entRef.firstChild;

      jsUnitCore.assertNotNull("entElementNotNull",entElement);
entElementText = entElement.firstChild;

      jsUnitCore.assertNotNull("entElementTextNotNull",entElementText);

	{
		success = false;
		try {
            splitNode = entElementText.splitText(2);
        }
		catch(ex) {
      success = (typeof(ex.code) != 'undefined' && ex.code == 7);
		}
		jsUnitCore.assertTrue("throw_NO_MODIFICATION_ALLOWED_ERR",success);
	}

})()

