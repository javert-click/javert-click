
var docs = initDOMHeapCoreLevel1();
var jsUnitCore = initJsUnitCore();
var DOMTestCase = initDOMTestCase(jsUnitCore);   


/**
* 
    The "removeAttribute(name)" method for an attribute causes the 
   DOMException NO_MODIFICATION_ALLOWED_ERR to be raised
   if the node is readonly.
   
   Obtain the children of the THIRD "gender" element.  The elements
   content is an entity reference.  Try to remove the "domestic" attribute
   from the entity reference by executing the "removeAttribute(name)" method.
   This causes a NO_MODIFICATION_ALLOWED_ERR DOMException to be thrown.

* @author NIST
* @author Mary Brady
* @see http://www.w3.org/TR/1998/REC-DOM-Level-1-19981001/level-one-core#xpointer(id('ID-258A00AF')/constant[@name='NO_MODIFICATION_ALLOWED_ERR'])
* @see http://www.w3.org/TR/1998/REC-DOM-Level-1-19981001/level-one-core#ID-6D6AC0F9
* @see http://www.w3.org/TR/1998/REC-DOM-Level-1-19981001/level-one-core#xpointer(id('ID-6D6AC0F9')/raises/exception[@name='DOMException']/descr/p[substring-before(.,':')='NO_MODIFICATION_ALLOWED_ERR'])
* @see http://www.w3.org/TR/1998/REC-DOM-Level-1-19981001/level-one-core#ID-6D6AC0F9
*/

     /*
     * @id elementremoveattributenomodificationallowederr
     */
     (function elementremoveattributenomodificationallowederr() {
   var success; 
    var doc;
      var genderList;
      var gender;
      var genList;
      var gen;
      var gList;
      var nodeType;
      var genElement;
      
	   
	   
	doc = docs["staff.xml"]
           genderList = doc.getElementsByTagName("gender");
      gender = genderList.item(2);
      genList = gender.childNodes;

      gen = genList.item(0);
      jsUnitCore.assertNotNull("genNotNull",gen);
nodeType = gen.nodeType;

      
	if(
	(1 == nodeType)
	) {
	gen = doc.createEntityReference("ent4");
      jsUnitCore.assertNotNull("createdEntRefNotNull",gen);

	}
	gList = gen.childNodes;

      genElement = gList.item(0);
      jsUnitCore.assertNotNull("genElementNotNull",genElement);

	{
		success = false;
		try {
            genElement.removeAttribute("domestic");
        }
		catch(ex) {
      success = (typeof(ex.code) != 'undefined' && ex.code == 7);
		}
		jsUnitCore.assertTrue("throw_NO_MODIFICATION_ALLOWED_ERR",success);
	}

})()

